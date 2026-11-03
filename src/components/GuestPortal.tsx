import React, { useState, useEffect, useMemo } from 'react';
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase';
import {
  Users,
  UserCheck,
  MapPin,
  Calendar,
  Search,
  Download,
  Copy,
  Trash2,
  MessageCircle,
  Check,
  X,
  Loader2,
  Sparkles,
  FileSpreadsheet,
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
} from 'lucide-react';

export interface RsvpEntry {
  id: string;
  name: string;
  phone?: string;
  address?: string;
  guestCount?: string | number;
  events?: string[] | string;
  wishes?: string;
  createdAt: string;
}

const ALL_EVENTS = [
  'Shri Ganesh Pujan',
  'Haldatwan',
  'Ring Ceremony & Gala Dinner',
  'Chak Bhat',
  'Wedding Ceremony & Dinner',
];

interface GuestPortalProps {
  onBackToSite?: () => void;
}

export const GuestPortal: React.FC<GuestPortalProps> = ({ onBackToSite }) => {
  const [rsvps, setRsvps] = useState<RsvpEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventFilter, setSelectedEventFilter] = useState<string>('all');
  
  // Feedback states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedAddressId, setCopiedAddressId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<RsvpEntry | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Firestore Real-Time Listener
  useEffect(() => {
    setLoading(true);
    const rsvpCollectionRef = collection(db, 'rsvps');

    const unsubscribe = onSnapshot(
      rsvpCollectionRef,
      (snapshot) => {
        const loaded: RsvpEntry[] = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<RsvpEntry, 'id'>),
        }));

        // Sort by createdAt descending (newest submissions first)
        loaded.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0).getTime();
          const dateB = new Date(b.createdAt || 0).getTime();
          return dateB - dateA;
        });

        setRsvps(loaded);
        setLoading(false);
      },
      (error) => {
        console.error('Firestore real-time RSVP listener error:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Calculate Headcount
  const parseHeadcount = (count?: string | number): number => {
    if (!count) return 1;
    if (typeof count === 'number') return count;
    if (count === '5+') return 5;
    const parsed = parseInt(count, 10);
    return isNaN(parsed) ? 1 : parsed;
  };

  // Metrics Analytics
  const metrics = useMemo(() => {
    const totalRsvps = rsvps.length;
    let totalHeadcount = 0;
    let totalAddresses = 0;

    const eventCounts: Record<string, number> = {
      'Shri Ganesh Pujan': 0,
      'Haldatwan': 0,
      'Ring Ceremony & Gala Dinner': 0,
      'Chak Bhat': 0,
      'Wedding Ceremony & Dinner': 0,
    };

    rsvps.forEach((r) => {
      totalHeadcount += parseHeadcount(r.guestCount);
      if (r.address && r.address.trim().length > 0) {
        totalAddresses++;
      }

      // Track event breakdown
      const evList = Array.isArray(r.events)
        ? r.events
        : typeof r.events === 'string'
        ? [r.events]
        : ALL_EVENTS; // default if not specified

      evList.forEach((evName) => {
        if (eventCounts[evName] !== undefined) {
          eventCounts[evName]++;
        }
      });
    });

    return {
      totalRsvps,
      totalHeadcount,
      totalAddresses,
      eventCounts,
    };
  }, [rsvps]);

  // Filtered List
  const filteredRsvps = useMemo(() => {
    return rsvps.filter((item) => {
      // 1. Search Query (Name or Phone)
      const q = searchQuery.toLowerCase().trim();
      const nameMatch = item.name?.toLowerCase().includes(q);
      const phoneMatch = item.phone?.toLowerCase().includes(q);
      const matchesSearch = !q || nameMatch || phoneMatch;

      // 2. Event Filter
      let matchesEvent = true;
      if (selectedEventFilter !== 'all') {
        const evList = Array.isArray(item.events)
          ? item.events
          : typeof item.events === 'string'
          ? [item.events]
          : ALL_EVENTS;
        matchesEvent = evList.includes(selectedEventFilter);
      }

      return matchesSearch && matchesEvent;
    });
  }, [rsvps, searchQuery, selectedEventFilter]);

  // Copy Postal Address
  const handleCopyAddress = (id: string, addressText?: string) => {
    if (!addressText) return;
    navigator.clipboard.writeText(addressText);
    setCopiedAddressId(id);
    showToast('Postal address copied to clipboard!');
    setTimeout(() => setCopiedAddressId(null), 2500);
  };

  // WhatsApp Helper
  const openWhatsApp = (guestName: string, phoneNum?: string) => {
    if (!phoneNum) {
      showToast('No phone number recorded for this guest.');
      return;
    }
    const cleanPhone = phoneNum.replace(/[^\d+]/g, '');
    const greeting = `Hello ${guestName}, warm greetings from Harshul & Saloni's family! Thank you for registering your wedding RSVP.`;
    const url = `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(greeting)}`;
    window.open(url, '_blank');
  };

  // Permanent Delete Entry
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, 'rsvps', deleteTarget.id));
      showToast(`Entry for "${deleteTarget.name}" deleted permanently.`);
      setDeleteTarget(null);
    } catch (err) {
      console.error('Failed to delete RSVP doc:', err);
      showToast('Error deleting entry. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  // CSV Export
  const downloadCSV = () => {
    if (rsvps.length === 0) {
      showToast('No RSVP entries available to export.');
      return;
    }

    const headers = [
      'Guest Name',
      'Phone / WhatsApp',
      'Guest Count',
      'Attending Events',
      'Postal Address',
      'Wishes / Blessings',
      'Submission Date',
    ];

    const rows = rsvps.map((r) => {
      const evStr = Array.isArray(r.events)
        ? r.events.join('; ')
        : r.events || 'All Events';
      const formattedDate = r.createdAt
        ? new Date(r.createdAt).toLocaleString()
        : '';

      return [
        `"${(r.name || '').replace(/"/g, '""')}"`,
        `"${(r.phone || '').replace(/"/g, '""')}"`,
        `"${r.guestCount || 1}"`,
        `"${evStr.replace(/"/g, '""')}"`,
        `"${(r.address || '').replace(/"/g, '""')}"`,
        `"${(r.wishes || '').replace(/"/g, '""')}"`,
        `"${formattedDate}"`,
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `Harshul_Saloni_Guest_List_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('CSV downloaded successfully!');
  };

  // Copy Google Sheets Formula
  const copyGoogleSheetsFormula = () => {
    const exportUrl = `${window.location.origin}/api/rsvp/export.csv`;
    const formula = `=IMPORTDATA("${exportUrl}")`;
    navigator.clipboard.writeText(formula);
    showToast(`Google Sheets formula copied! Paste ${formula} into cell A1.`);
  };

  return (
    <div className="min-h-screen w-full bg-[#3B0821] text-[#FFF9F0] p-3 sm:p-6 md:p-8 selection:bg-[#F0CE7A] selection:text-[#3B0821]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#800D2A] text-[#FFE8B5] px-4 py-2.5 rounded-xl border border-[#F0CE7A]/50 shadow-2xl flex items-center gap-2 text-xs sm:text-sm font-serif animate-bounce">
          <Sparkles className="w-4 h-4 text-[#F0CE7A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#F0CE7A]/30">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#800D2A]/80 border border-[#F0CE7A]/40 text-[#FFE8B5] text-[11px] uppercase tracking-widest font-serif mb-1.5">
              <UserCheck className="w-3.5 h-3.5 text-[#F0CE7A]" />
              <span>Admin Management Portal</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#FFF8EB] tracking-wide">
              Harshul &amp; Saloni &bull; Guest List &amp; RSVPs
            </h1>
            <p className="font-serif italic text-xs sm:text-sm text-[#FFE8B5]/80 mt-0.5">
              Real-time Firestore Guest Management, Contact List &amp; Event Analytics
            </p>
          </div>

          {/* Export Action Header Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {onBackToSite && (
              <button
                type="button"
                onClick={() => {
                  window.location.hash = '';
                  onBackToSite();
                }}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#FFE8B5] text-xs font-serif font-semibold tracking-wider flex items-center gap-1.5 border border-white/20 shadow-md cursor-pointer transition-all active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 text-[#F0CE7A]" />
                <span>Public Website</span>
              </button>
            )}

            <button
              type="button"
              onClick={downloadCSV}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#800D2A] to-[#9B1235] hover:from-[#680A22] hover:to-[#800D2A] text-[#FFFDF8] text-xs font-serif font-bold tracking-wider uppercase flex items-center gap-2 border border-[#F0CE7A]/40 shadow-md cursor-pointer transition-all active:scale-95"
            >
              <Download className="w-4 h-4 text-[#F0CE7A]" />
              <span>Download Excel/CSV</span>
            </button>

            <button
              type="button"
              onClick={copyGoogleSheetsFormula}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#FFE8B5] text-xs font-serif font-semibold tracking-wider flex items-center gap-2 border border-white/20 shadow-md cursor-pointer transition-all active:scale-95"
              title="Copy =IMPORTDATA formula for Google Sheets live sync"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#F0CE7A]" />
              <span>Copy Sheets Formula</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">

        {/* METRICS & ANALYTICS CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Card 1: Total RSVPs */}
          <div className="p-4 rounded-2xl bg-[#520C2E]/90 border border-[#F0CE7A]/30 shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#FFE8B5]">
                Total RSVPs
              </span>
              <Users className="w-5 h-5 text-[#F0CE7A]" />
            </div>
            <div className="mt-2">
              <span className="font-serif text-2xl sm:text-3xl font-black text-white">
                {metrics.totalRsvps}
              </span>
              <p className="text-[11px] font-sans text-gray-300 mt-0.5">
                Submissions received
              </p>
            </div>
          </div>

          {/* Card 2: Headcount */}
          <div className="p-4 rounded-2xl bg-[#520C2E]/90 border border-[#F0CE7A]/30 shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#FFE8B5]">
                Guest Headcount
              </span>
              <UserCheck className="w-5 h-5 text-[#F0CE7A]" />
            </div>
            <div className="mt-2">
              <span className="font-serif text-2xl sm:text-3xl font-black text-[#F0CE7A]">
                {metrics.totalHeadcount}
              </span>
              <p className="text-[11px] font-sans text-gray-300 mt-0.5">
                Attending guests expected
              </p>
            </div>
          </div>

          {/* Card 3: Addresses Collected */}
          <div className="p-4 rounded-2xl bg-[#520C2E]/90 border border-[#F0CE7A]/30 shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#FFE8B5]">
                Postal Addresses
              </span>
              <MapPin className="w-5 h-5 text-[#F0CE7A]" />
            </div>
            <div className="mt-2">
              <span className="font-serif text-2xl sm:text-3xl font-black text-white">
                {metrics.totalAddresses}
              </span>
              <p className="text-[11px] font-sans text-gray-300 mt-0.5">
                Physical addresses collected
              </p>
            </div>
          </div>

          {/* Card 4: Event breakdown summary */}
          <div className="p-4 rounded-2xl bg-[#520C2E]/90 border border-[#F0CE7A]/30 shadow-lg flex flex-col justify-between col-span-2 sm:col-span-3 lg:col-span-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#FFE8B5]">
                Wedding Ceremony
              </span>
              <Calendar className="w-5 h-5 text-[#F0CE7A]" />
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl font-black text-[#FFF8EB]">
                {metrics.eventCounts['Wedding Ceremony & Dinner']}
              </span>
              <p className="text-[11px] font-sans text-gray-300 mt-0.5">
                Guests attending main wedding
              </p>
            </div>
          </div>

        </div>

        {/* EVENT ATTENDANCE BREAKDOWN BANNER */}
        <div className="p-4 rounded-2xl bg-[#4A0B28] border border-[#F0CE7A]/25 shadow-md">
          <h3 className="font-serif text-xs uppercase tracking-widest font-bold text-[#F0CE7A] mb-3">
            Event-wise Attendance Counter:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {ALL_EVENTS.map((evName) => (
              <div
                key={evName}
                className="p-2.5 rounded-xl bg-black/20 border border-white/10 text-center flex flex-col justify-center"
              >
                <span className="text-[11px] font-serif text-[#FFE8B5] font-medium leading-tight block mb-1">
                  {evName}
                </span>
                <span className="font-serif text-lg font-bold text-white">
                  {metrics.eventCounts[evName] || 0} Guests
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CONTROLS: SEARCH & FILTERS */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-[#520C2E]/80 border border-[#F0CE7A]/30 shadow-md">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by guest name or phone..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-black/30 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#F0CE7A]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Event Filter Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-serif font-medium text-[#FFE8B5] whitespace-nowrap">
              Filter Event:
            </span>
            <select
              value={selectedEventFilter}
              onChange={(e) => setSelectedEventFilter(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 text-xs sm:text-sm rounded-xl bg-black/30 border border-white/20 text-[#FFFDF8] focus:outline-none focus:border-[#F0CE7A] cursor-pointer"
            >
              <option value="all" className="bg-[#3B0821]">All Events ({rsvps.length})</option>
              {ALL_EVENTS.map((ev) => (
                <option key={ev} value={ev} className="bg-[#3B0821]">
                  {ev} ({metrics.eventCounts[ev] || 0})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="p-12 rounded-2xl bg-[#520C2E]/60 border border-[#F0CE7A]/20 flex flex-col items-center justify-center text-center">
            <Loader2 className="w-8 h-8 text-[#F0CE7A] animate-spin mb-3" />
            <p className="font-serif text-sm text-[#FFE8B5] tracking-wide">
              Loading Real-time Firestore Guest RSVPs...
            </p>
          </div>
        ) : filteredRsvps.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#520C2E]/60 border border-[#F0CE7A]/20 flex flex-col items-center justify-center text-center">
            <AlertTriangle className="w-8 h-8 text-[#F0CE7A] mb-2" />
            <h4 className="font-serif text-lg font-bold text-white">No Guests Found</h4>
            <p className="font-serif text-xs text-[#FFE8B5]/80 max-w-sm mt-1">
              {searchQuery || selectedEventFilter !== 'all'
                ? 'Try adjusting your search query or event filter.'
                : 'No RSVPs submitted yet. New guest registrations will appear here automatically in real time!'}
            </p>
          </div>
        ) : (
          <>
            {/* DESKTOP TABLE VIEW */}
            <div className="hidden lg:block rounded-2xl bg-[#520C2E]/90 border border-[#F0CE7A]/30 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-serif border-collapse">
                  <thead>
                    <tr className="bg-[#3B0821] text-[#F0CE7A] text-xs uppercase tracking-wider border-b border-[#F0CE7A]/30">
                      <th className="py-3.5 px-4 font-bold">Guest Name</th>
                      <th className="py-3.5 px-4 font-bold">Phone / WhatsApp</th>
                      <th className="py-3.5 px-4 font-bold">Guests</th>
                      <th className="py-3.5 px-4 font-bold">Attending Events</th>
                      <th className="py-3.5 px-4 font-bold">Postal Address</th>
                      <th className="py-3.5 px-4 font-bold">Wishes Message</th>
                      <th className="py-3.5 px-4 font-bold">Date Submitted</th>
                      <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-xs sm:text-sm">
                    {filteredRsvps.map((rsvp) => {
                      const evList = Array.isArray(rsvp.events)
                        ? rsvp.events
                        : typeof rsvp.events === 'string'
                        ? [rsvp.events]
                        : ['Wedding Ceremony & Dinner'];

                      return (
                        <tr key={rsvp.id} className="hover:bg-white/[0.04] transition-colors">
                          {/* Name */}
                          <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                            {rsvp.name}
                          </td>

                          {/* Phone */}
                          <td className="py-3.5 px-4 text-[#FFE8B5] whitespace-nowrap">
                            {rsvp.phone ? (
                              <button
                                type="button"
                                onClick={() => openWhatsApp(rsvp.name, rsvp.phone)}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-900/40 hover:bg-green-800/60 text-green-300 border border-green-500/30 text-xs font-sans transition-colors cursor-pointer"
                                title="Click to chat on WhatsApp"
                              >
                                <MessageCircle className="w-3.5 h-3.5 text-green-400" />
                                <span>{rsvp.phone}</span>
                              </button>
                            ) : (
                              <span className="text-gray-400 italic">Not provided</span>
                            )}
                          </td>

                          {/* Headcount */}
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-1 rounded-full bg-[#800D2A] text-[#FFE8B5] font-bold text-xs border border-[#F0CE7A]/30">
                              {rsvp.guestCount || '1'}
                            </span>
                          </td>

                          {/* Events Badges */}
                          <td className="py-3.5 px-4 max-w-xs">
                            <div className="flex flex-wrap gap-1">
                              {evList.map((ev) => (
                                <span
                                  key={ev}
                                  className="px-2 py-0.5 rounded-md bg-white/10 text-[#FFE8B5] text-[10px] font-sans border border-white/10"
                                >
                                  {ev}
                                </span>
                              ))}
                            </div>
                          </td>

                          {/* Address */}
                          <td className="py-3.5 px-4 max-w-xs text-gray-200">
                            {rsvp.address ? (
                              <div className="flex items-center gap-1.5">
                                <span className="truncate max-w-[180px]">{rsvp.address}</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopyAddress(rsvp.id, rsvp.address)}
                                  className="p-1 rounded hover:bg-white/10 text-[#F0CE7A]"
                                  title="Copy postal address"
                                >
                                  {copiedAddressId === rsvp.id ? (
                                    <Check className="w-3.5 h-3.5 text-green-400" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            ) : (
                              <span className="text-gray-400 italic">No address</span>
                            )}
                          </td>

                          {/* Wishes */}
                          <td className="py-3.5 px-4 max-w-xs italic text-gray-300 truncate">
                            {rsvp.wishes ? `"${rsvp.wishes}"` : '—'}
                          </td>

                          {/* Date */}
                          <td className="py-3.5 px-4 text-gray-400 text-xs whitespace-nowrap">
                            {rsvp.createdAt
                              ? new Date(rsvp.createdAt).toLocaleDateString()
                              : '—'}
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => setDeleteTarget(rsvp)}
                              className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 hover:text-white border border-red-500/30 transition-colors cursor-pointer"
                              title="Delete entry permanently"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* MOBILE CARDS VIEW */}
            <div className="block lg:hidden space-y-3">
              {filteredRsvps.map((rsvp) => {
                const evList = Array.isArray(rsvp.events)
                  ? rsvp.events
                  : typeof rsvp.events === 'string'
                  ? [rsvp.events]
                  : ['Wedding Ceremony & Dinner'];

                return (
                  <div
                    key={rsvp.id}
                    className="p-4 rounded-2xl bg-[#520C2E]/90 border border-[#F0CE7A]/30 shadow-lg space-y-3 font-serif"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-base font-bold text-white">{rsvp.name}</h4>
                        <p className="text-xs text-gray-400">
                          Submitted:{' '}
                          {rsvp.createdAt
                            ? new Date(rsvp.createdAt).toLocaleDateString()
                            : '—'}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#800D2A] text-[#FFE8B5] font-bold text-xs border border-[#F0CE7A]/30">
                          {rsvp.guestCount || '1'} Guests
                        </span>

                        <button
                          type="button"
                          onClick={() => setDeleteTarget(rsvp)}
                          className="p-1.5 rounded-lg bg-red-950/60 text-red-300 hover:bg-red-900 transition-colors"
                          title="Delete entry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Phone & WhatsApp */}
                    {rsvp.phone && (
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-[#FFE8B5] font-semibold">Phone:</span>
                        <button
                          type="button"
                          onClick={() => openWhatsApp(rsvp.name, rsvp.phone)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-900/40 text-green-300 border border-green-500/30 text-xs font-sans"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-green-400" />
                          <span>{rsvp.phone}</span>
                        </button>
                      </div>
                    )}

                    {/* Attending Events Badges */}
                    <div>
                      <span className="text-[11px] text-[#FFE8B5] font-semibold block mb-1">
                        Attending Events:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {evList.map((ev) => (
                          <span
                            key={ev}
                            className="px-2 py-0.5 rounded-md bg-white/10 text-[#FFE8B5] text-[10px] font-sans border border-white/10"
                          >
                            {ev}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Address */}
                    {rsvp.address && (
                      <div className="text-xs text-gray-200 bg-black/20 p-2 rounded-xl border border-white/10 flex items-start justify-between gap-2">
                        <div className="flex items-start gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#F0CE7A] shrink-0 mt-0.5" />
                          <span className="leading-snug">{rsvp.address}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyAddress(rsvp.id, rsvp.address)}
                          className="p-1 rounded text-[#F0CE7A] hover:bg-white/10 shrink-0"
                          title="Copy address"
                        >
                          {copiedAddressId === rsvp.id ? (
                            <Check className="w-3.5 h-3.5 text-green-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    )}

                    {/* Wishes */}
                    {rsvp.wishes && (
                      <p className="text-xs italic text-gray-300 bg-white/5 p-2 rounded-xl border border-white/5">
                        "{rsvp.wishes}"
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

      </div>

      {/* CONFIRMATION DELETE MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-[#4A0E2E] p-6 text-white border border-[#F0CE7A]/40 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-serif text-lg font-bold text-white">
                Delete Guest Entry?
              </h3>
            </div>

            <p className="font-serif text-xs sm:text-sm text-[#FFE8B5]/90 leading-relaxed">
              Are you sure you want to permanently delete the RSVP entry for{' '}
              <strong className="text-white font-bold">{deleteTarget.name}</strong>? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="px-5 py-2 rounded-xl bg-red-800 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Entry</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
