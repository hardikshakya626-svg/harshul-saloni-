// server.ts
import express from "express";
import { createServer as createViteServer } from "vite";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var PORT = process.env.PORT || 3e3;
var firebaseConfigPath = path.resolve(process.cwd(), "firebase-applet-config.json");
var firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, "utf-8"));
var firebaseApp = initializeApp(firebaseConfig);
var db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);
app.get("/api/rsvp/export.csv", async (req, res) => {
  try {
    let rsvps = [];
    try {
      const restUrl = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/${firebaseConfig.firestoreDatabaseId}/documents:runQuery?key=${firebaseConfig.apiKey}`;
      const response = await fetch(restUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          structuredQuery: {
            from: [{ collectionId: "rsvps" }]
          }
        })
      });
      if (response.ok) {
        const queryResults = await response.json();
        rsvps = queryResults.filter((item) => item.document).map((item) => {
          const fields = item.document.fields || {};
          const parseVal = (val) => {
            if (!val) return "";
            if (val.stringValue) return val.stringValue;
            if (val.integerValue) return val.integerValue;
            if (val.arrayValue)
              return (val.arrayValue.values || []).map(parseVal);
            return "";
          };
          return {
            name: parseVal(fields.name),
            phone: parseVal(fields.phone),
            guestCount: parseVal(fields.guestCount),
            address: parseVal(fields.address),
            events: parseVal(fields.events),
            wishes: parseVal(fields.wishes),
            createdAt: parseVal(fields.createdAt)
          };
        });
      }
    } catch {
      const rsvpSnap = await getDocs(collection(db, "rsvps"));
      rsvps = rsvpSnap.docs.map((docSnap) => docSnap.data());
    }
    rsvps.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    });
    const headers = [
      "Guest Name",
      "Phone / WhatsApp",
      "Guest Count",
      "Attending Events",
      "Postal Address",
      "Wishes Message",
      "Date Submitted"
    ];
    const rows = rsvps.map((r) => {
      const evStr = Array.isArray(r.events) ? r.events.join("; ") : r.events || "Wedding Ceremony & Dinner";
      const formattedDate = r.createdAt ? new Date(r.createdAt).toLocaleString() : "";
      return [
        `"${(r.name || "").replace(/"/g, '""')}"`,
        `"${(r.phone || "").replace(/"/g, '""')}"`,
        `"${r.guestCount || 1}"`,
        `"${evStr.replace(/"/g, '""')}"`,
        `"${(r.address || "").replace(/"/g, '""')}"`,
        `"${(r.wishes || "").replace(/"/g, '""')}"`,
        `"${formattedDate}"`
      ].join(",");
    });
    const csvContent = [headers.join(","), ...rows].join("\n");
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Harshul_Saloni_Guest_List.csv"'
    );
    res.status(200).send(csvContent);
  } catch (err) {
    console.error("Error generating CSV export:", err);
    res.status(500).send("Failed to generate CSV export");
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom"
    });
    app.use(vite.middlewares);
    app.use("*", async (req, res, next) => {
      if (req.originalUrl.startsWith("/api")) return next();
      try {
        const fs2 = await import("fs");
        const path2 = await import("path");
        let template = fs2.readFileSync(
          path2.resolve(__dirname, "index.html"),
          "utf-8"
        );
        template = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("index.html", { root: "dist" });
    });
  }
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
startServer();
