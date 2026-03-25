import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock API for Cycle Rental
  const cycles = [
    { id: 1, name: "City Cruiser", type: "Standard", price: 15, available: true, location: [22.5726, 88.3639], description: "Perfect for city streets." },
    { id: 2, name: "Mountain Pro", type: "MTB", price: 25, available: true, location: [22.5851, 88.3468], description: "Tackle any terrain." },
    { id: 3, name: "Electric Glide", type: "Electric", price: 40, available: true, location: [22.5675, 88.3474], description: "Effortless riding." },
    { id: 4, name: "Vintage Kolkata", type: "Classic", price: 20, available: true, location: [22.5958, 88.3433], description: "Classic look, modern feel." },
  ];

  app.get("/api/cycles", (req, res) => {
    res.json(cycles);
  });

  app.post("/api/book", (req, res) => {
    const { cycleId, userId } = req.body;
    // Mock booking logic
    res.json({ success: true, bookingId: `BK-${Math.floor(Math.random() * 10000)}`, message: "Booking successful!" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`RideKolkata Server running on http://localhost:${PORT}`);
  });
}

startServer();
