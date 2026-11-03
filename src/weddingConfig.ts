/**
 * Centralized Wedding Configuration for Harshul & Saloni
 * All invitation text, dates, times, venues, family details, and photo URLs.
 * Set to English across the site, preserving sacred Sanskrit mantras as requested.
 */

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  venueAddress: string;
  description: string;
  mapQuery: string;
}

export interface FamilySide {
  sideLabel: string;
  childTitleAndName: string;
  grandparentsLabel: string;
  grandparents: string;
  parentsLabel: string;
  parents: string;
  residenceLabel: string;
  residence: string;
}

export interface WeddingConfig {
  couple: {
    groom: {
      nameEnglish: string;
      relationEnglish: string;
      parentsEnglish: string;
    };
    bride: {
      nameEnglish: string;
      relationEnglish: string;
      parentsEnglish: string;
    };
    monogram: string;
    couplePhotoUrl: string;
  };
  religiousInvocations: {
    ganeshHeading: string;
    shlokaLines: string[];
    invitationPreamble: string[];
    bondText: string;
    blessingText: string;
    secondaryGaneshShloka: string[];
  };
  primaryEvents: EventItem[];
  families: {
    groomSide: FamilySide;
    brideSide: FamilySide;
  };
  footer: {
    scriptHeading: string;
    wishingWellLines: string[];
    rsvpThankYouMessage: string;
    rsvpSubtext: string;
    contactPerson: string;
    phones: string[];
    residenceAddress: string;
    venueName: string;
    venueLocation: string;
  };
  photoBlessingSection: {
    headingEnglish: string;
    ganeshMantraHeading: string;
    ganeshMantraLines: string[];
    mantraTranslation: string;
    coupleCaption: string;
    subCaption: string;
    photoUrl: string;
  };
}

export const WEDDING_CONFIG: WeddingConfig = {
  couple: {
    groom: {
      nameEnglish: "Harshul",
      relationEnglish: "Son of",
      parentsEnglish: "Smt. Sangeeta & Shri Sanjay Saraf",
    },
    bride: {
      nameEnglish: "Saloni",
      relationEnglish: "Daughter of",
      parentsEnglish: "Smt. Bhavana & Shri Manish Jaisinghani",
    },
    monogram: "H & S",
    couplePhotoUrl:
      "https://firebasestorage.googleapis.com/v0/b/brothers-productions.firebasestorage.app/o/logo%2Fharshul%20hero%20image%2FDSC02100_resized%20(1).jpg?alt=media&token=6025a999-f456-4acd-840d-344cebad060d",
  },

  religiousInvocations: {
    // Sacred Sanskrit Invocations (Preserved as requested)
    ganeshHeading: "॥ श्री गणेशाय नमः ॥",
    shlokaLines: [
      "विघ्न हरण मंगल करण, गौरी पुत्र गणेश ।",
      "प्रथम निमंत्रण आपको, ब्रह्मा विष्णु महेश ॥",
    ],
    // English Invitation Details in easy, warm, natural language
    invitationPreamble: [
      "Dear Family & Friends,",
      "Together with our families, we joyfully invite you to celebrate the wedding of",
    ],
    bondText: "We Are Getting Married",
    blessingText:
      "We would love for you to join us with your love, laughter, and blessings as we begin our new journey together.",
    secondaryGaneshShloka: [
      "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।",
      "निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
    ],
  },

  // Auspicious Wedding Events
  primaryEvents: [
    {
      id: "ganesh-pujan",
      title: "Shri Ganesh Pujan",
      date: "Saturday, 28 November 2026",
      time: "Auspicious Muhurat",
      venue: "Saraf Residence, Orchid Tower",
      venueAddress: "Maharana Pratap Nagar, Gwalior",
      description:
        "Invoking the divine blessings of Lord Ganesha for joy, prosperity, and an auspicious new beginning.",
      mapQuery: "Orchid Tower Maharana Pratap Nagar Gwalior",
    },
    {
      id: "haldatwan",
      title: "Haldatwan",
      date: "Monday, 30 November 2026",
      time: "11:00 AM onwards",
      venue: "Saraf Residence, Orchid Tower",
      venueAddress: "Maharana Pratap Nagar, Gwalior",
      description:
        "Traditional turmeric blessings, sacred rituals, and joyful celebrations with family.",
      mapQuery: "Orchid Tower Maharana Pratap Nagar Gwalior",
    },
    {
      id: "ring-ceremony",
      title: "Ring Ceremony & Gala Dinner",
      date: "Tuesday, 1 December 2026",
      time: "8:00 PM onwards",
      venue: "Imperial Golf Resort",
      venueAddress: "NH-44, Rairu Dabra Bypass Road, Gwalior",
      description:
        "Exchange of rings, musical celebration, and an enchanting evening followed by a grand gala dinner.",
      mapQuery: "Imperial Golf Resort Gwalior",
    },
    {
      id: "chak-bhat",
      title: "Chak Bhat",
      date: "Wednesday, 2 December 2026",
      time: "11:00 AM onwards",
      venue: "Imperial Golf Resort",
      venueAddress: "NH-44, Rairu Dabra Bypass Road, Gwalior",
      description:
        "Sacred maternal uncle welcoming traditions filled with love, festive customs, and heartfelt blessings.",
      mapQuery: "Imperial Golf Resort Gwalior",
    },
    {
      id: "wedding",
      title: "Wedding Ceremony & Dinner",
      date: "Wednesday, 2 December 2026",
      time: "8:00 PM onwards",
      venue: "Imperial Golf Resort",
      venueAddress: "NH-44, Rairu Dabra Bypass Road, Gwalior",
      description:
        "The sacred wedding vows, holy pheras around the divine agni, and a lavish celebratory wedding dinner.",
      mapQuery: "Imperial Golf Resort Gwalior",
    },
  ],

  families: {
    groomSide: {
      sideLabel: "Groom's Family",
      childTitleAndName: "Harshul",
      grandparentsLabel: "Grandson of",
      grandparents: "Late Smt. Sumitra & Shri Ramgopal Saraf",
      parentsLabel: "Son of",
      parents: "Smt. Sangeeta & Shri Sanjay Saraf",
      residenceLabel: "Residence",
      residence: "Gwalior (M.P.)",
    },
    brideSide: {
      sideLabel: "Bride's Family",
      childTitleAndName: "Saloni",
      grandparentsLabel: "Granddaughter of",
      grandparents: "Late Smt. Kavita & Late Shri Govardhan Das Jaisinghani",
      parentsLabel: "Daughter of",
      parents: "Smt. Bhavana & Shri Manish Jaisinghani",
      residenceLabel: "Residence",
      residence: "Gwalior (M.P.)",
    },
  },

  footer: {
    scriptHeading: "With Love & Best Wishes",
    wishingWellLines: [
      "Sanjay - Sangeeta Saraf",
      "Hindustan Marbles",
      "Harshul Marbles",
      "Creation Gallery",
      "Simpolo Tiles & Bath Wares",
      "Gwalior",
    ],
    rsvpThankYouMessage: "We can't wait to celebrate with you!",
    rsvpSubtext: "Please let us know if you can make it to our wedding celebrations.",
    contactPerson: "Smt. Sangeeta & Shri Sanjay Saraf",
    phones: ["9229210341", "9229110341"],
    residenceAddress:
      "Flat No. 807, A-Block, Orchid Tower, Maharana Pratap Nagar, Gwalior - 474002 (M.P.)",
    venueName: "Imperial Golf Resort",
    venueLocation: "NH-44, Rairu Dabra Bypass Road, Gwalior (M.P.)",
  },

  photoBlessingSection: {
    headingEnglish: "Sacred Vows & Divine Blessings",
    ganeshMantraHeading: "॥ श्री गणेशाय नमः ॥",
    // Sacred Sanskrit Ganesh Mantra (Preserved)
    ganeshMantraLines: [
      "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।",
      "निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
    ],
    mantraTranslation:
      "May Lord Ganesha remove all obstacles, illuminate our union with the radiance of a million suns, and bless this new beginning with eternal joy, peace, and harmony.",
    coupleCaption: "Harshul & Saloni",
    subCaption: "Bound by Love • Blessed by the Divine",
    photoUrl:
      "https://firebasestorage.googleapis.com/v0/b/brothers-productions.firebasestorage.app/o/logo%2Fharshul%20hero%20image%2FDSC02100_resized%20(1).jpg?alt=media&token=6025a999-f456-4acd-840d-344cebad060d",
  },
};
