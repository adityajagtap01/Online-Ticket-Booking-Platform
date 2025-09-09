import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-e6c01fe5/health", (c) => {
  return c.json({ status: "ok" });
});

// Debug endpoint to check database contents
app.get("/make-server-e6c01fe5/debug", async (c) => {
  try {
    const movies = await kv.get("movies");
    const sports = await kv.get("sports");
    const streams = await kv.get("streams");

    return c.json({
      movies: movies ? movies.length : 0,
      sports: sports ? sports.length : 0,
      streams: streams ? streams.length : 0,
      moviesData: movies || null,
      sportsData: sports || null,
      streamsData: streams || null
    });
  } catch (error) {
    console.error("Error in debug endpoint:", error);
    return c.json({ error: "Debug failed", details: error.message }, 500);
  }
});

// Force reinitialization endpoint
app.post("/make-server-e6c01fe5/reinitialize", async (c) => {
  try {
    await initializeDatabase();
    return c.json({ success: true, message: "Database reinitialized successfully" });
  } catch (error) {
    console.error("Error reinitializing database:", error);
    return c.json({ error: "Reinitialization failed", details: error.message }, 500);
  }
});

// Initialize database with seed data
async function initializeDatabase() {
  try {
    // Always reinitialize to ensure fresh data with updated images
    console.log("Initializing database with seed data...");

    // Movies data with unique images
    const movies = [
      {
        id: 1,
        title: "Spider-Man: No Way Home",
        type: "Movie",
        genre: "Action, Adventure",
        rating: 8.4,
        duration: "148 min",
        price: "499/-",
        image: "https://wallpapercave.com/wp/wp10252923.jpg",
        releaseDate: "December 17, 2021",
        language: "English",
        certificate: "PG-13",
        category: "movies"
      },
      {
        id: 2,
        title: "The Batman",
        type: "Movie",
        genre: "Action, Crime",
        rating: 7.8,
        duration: "176 min",
        price: "$14.99",
        image: "https://images.unsplash.com/photo-1604560109558-fdd438a533c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRtYW4lMjBkYXJrJTIwbW92aWUlMjBwb3N0ZXJ8ZW58MXx8fHwxNzU3MjYwMTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        releaseDate: "March 4, 2022",
        language: "English",
        certificate: "PG-13",
        category: "movies"
      },
      {
        id: 3,
        title: "Dune",
        type: "Movie",
        genre: "Sci-Fi, Adventure",
        rating: 8.0,
        duration: "155 min",
        price: "$13.99",
        image: "https://images.unsplash.com/photo-1500583871374-6e691f3cc482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdW5lJTIwc2NpLWZpJTIwbW92aWUlMjBwb3N0ZXIlMjBkZXNlcnR8ZW58MXx8fHwxNzU3MjYwMTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        releaseDate: "October 22, 2021",
        language: "English",
        certificate: "PG-13",
        category: "movies"
      },
      {
        id: 4,
        title: "Top Gun: Maverick",
        type: "Movie",
        genre: "Action, Drama",
        rating: 8.3,
        duration: "130 min",
        price: "$12.99",
        image: "https://images.unsplash.com/photo-1646514625502-d1cbeb904d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3AlMjBndW4lMjBhdmlhdGlvbiUyMG1vdmllJTIwcG9zdGVyJTIwZmlnaHRlciUyMGpldHxlbnwxfHx8fDE3NTcyNjAxNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        releaseDate: "May 27, 2022",
        language: "English",
        certificate: "PG-13",
        category: "movies"
      },
      {
        id: 5,
        title: "Avatar: The Way of Water",
        type: "Movie",
        genre: "Sci-Fi, Adventure",
        rating: 7.6,
        duration: "192 min",
        price: "$15.99",
        image: "https://images.unsplash.com/photo-1729791941653-9d77fa56197a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdmF0YXIlMjBvY2VhbiUyMHNjaS1maSUyMG1vdmllJTIwcG9zdGVyfGVufDF8fHx8MTc1NzI2MDE2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        releaseDate: "December 16, 2022",
        language: "English",
        certificate: "PG-13",
        category: "movies"
      }
    ];

    // Sports data with unique images
    const sports = [
      {
        id: 6,
        title: "NBA Finals Game 7",
        type: "Sports",
        genre: "Basketball",
        rating: 9.2,
        duration: "3 hours",
        price: "$89.99",
        image: "https://images.unsplash.com/photo-1687216769793-833dcfe4e3af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwc3BvcnRzJTIwYXJlbmF8ZW58MXx8fHwxNzU3MjU4MDE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        releaseDate: "June 15, 2024",
        language: "English",
        certificate: "G",
        category: "sports"
      },
      {
        id: 7,
        title: "Super Bowl LVIII",
        type: "Sports",
        genre: "Football",
        rating: 9.5,
        duration: "4 hours",
        price: "$199.99",
        image: "https://images.unsplash.com/photo-1686947079063-f1e7a7dfc6a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHN0YWRpdW0lMjBzcG9ydHN8ZW58MXx8fHwxNzU3MTcyNzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        releaseDate: "February 11, 2024",
        language: "English",
        certificate: "G",
        category: "sports"
      },
      {
        id: 8,
        title: "Wimbledon Finals",
        type: "Sports",
        genre: "Tennis",
        rating: 8.9,
        duration: "3 hours",
        price: "$149.99",
        image: "https://images.unsplash.com/photo-1564769353575-73f33a36d84f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBjb3VydCUyMHNwb3J0c3xlbnwxfHx8fDE3NTcyNTgwMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        releaseDate: "July 14, 2024",
        language: "English",
        certificate: "G",
        category: "sports"
      },
      {
        id: 9,
        title: "World Cup Final",
        type: "Sports",
        genre: "Soccer",
        rating: 9.8,
        duration: "2 hours",
        price: "$299.99",
        image: "https://images.unsplash.com/photo-1686947079063-f1e7a7dfc6a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHN0YWRpdW0lMjBzcG9ydHN8ZW58MXx8fHwxNzU3MTcyNzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        releaseDate: "December 18, 2022",
        language: "Multi-language",
        certificate: "G",
        category: "sports"
      }
    ];

    // Live Streams data with unique images
    const liveStreams = [
      {
        id: 10,
        title: "World Gaming Championship",
        type: "Live Stream",
        genre: "Esports",
        rating: 8.7,
        duration: "6 hours",
        price: "$19.99",
        image: "https://images.unsplash.com/photo-1675310854573-c5c8e4089426?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwZ2FtaW5nJTIwdG91cm5hbWVudHxlbnwxfHx8fDE3NTcyNTgwMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        releaseDate: "March 15, 2024",
        language: "English",
        certificate: "T",
        category: "streams"
      },
      {
        id: 11,
        title: "Live Concert - Taylor Swift",
        type: "Live Stream",
        genre: "Music",
        rating: 9.4,
        duration: "3 hours",
        price: "$49.99",
        image: "https://images.unsplash.com/photo-1631061434620-db65394197e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwY29uY2VydCUyMG11c2ljfGVufDF8fHx8MTc1NzI1ODAyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        releaseDate: "May 10, 2024",
        language: "English",
        certificate: "G",
        category: "streams"
      },
      {
        id: 12,
        title: "Tech Conference 2024",
        type: "Live Stream",
        genre: "Technology",
        rating: 8.1,
        duration: "8 hours",
        price: "$99.99",
        image: "https://images.unsplash.com/photo-1617507171089-6cb9aa5add36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzdHJlYW1pbmclMjBzZXR1cHxlbnwxfHx8fDE3NTcyMzcxMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        releaseDate: "April 22, 2024",
        language: "English",
        certificate: "G",
        category: "streams"
      },
      {
        id: 13,
        title: "Gaming Speedrun Marathon",
        type: "Live Stream",
        genre: "Gaming",
        rating: 8.5,
        duration: "12 hours",
        price: "$24.99",
        image: "https://images.unsplash.com/photo-1617507171089-6cb9aa5add36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzdHJlYW1pbmclMjBzZXR1cHxlbnwxfHx8fDE3NTcyMzcxMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        releaseDate: "June 5, 2024",
        language: "English",
        certificate: "T",
        category: "streams"
      }
    ];

    // Store data in KV store
    await kv.set("movies", movies);
    await kv.set("sports", sports);
    await kv.set("streams", liveStreams);

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

// Initialize database on startup
initializeDatabase();

// API Routes

// Get all events by category
app.get("/make-server-e6c01fe5/events/:category", async (c) => {
  try {
    const category = c.req.param("category");
    console.log(`Fetching events for category: ${category}`);

    const events = await kv.get(category);
    console.log(`Found ${events ? events.length : 0} events for category: ${category}`);

    if (!events) {
      console.log(`No events found for category: ${category}`);
      return c.json({ error: "Category not found", category }, 404);
    }

    return c.json({ data: events });
  } catch (error) {
    console.error("Error fetching events:", error);
    return c.json({ error: "Internal server error", details: error.message }, 500);
  }
});

// Get all events
app.get("/make-server-e6c01fe5/events", async (c) => {
  try {
    const movies = await kv.get("movies") || [];
    const sports = await kv.get("sports") || [];
    const streams = await kv.get("streams") || [];

    const allEvents = [...movies, ...sports, ...streams];

    return c.json({ data: allEvents });
  } catch (error) {
    console.error("Error fetching all events:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get event by ID
app.get("/make-server-e6c01fe5/event/:id", async (c) => {
  try {
    const eventId = parseInt(c.req.param("id"));

    const movies = await kv.get("movies") || [];
    const sports = await kv.get("sports") || [];
    const streams = await kv.get("streams") || [];

    const allEvents = [...movies, ...sports, ...streams];
    const event = allEvents.find(e => e.id === eventId);

    if (!event) {
      return c.json({ error: "Event not found" }, 404);
    }

    return c.json({ data: event });
  } catch (error) {
    console.error("Error fetching event:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Search events
app.get("/make-server-e6c01fe5/search", async (c) => {
  try {
    const query = c.req.query("q")?.toLowerCase() || "";
    const category = c.req.query("category") || "all";

    let events = [];

    if (category === "all") {
      const movies = await kv.get("movies") || [];
      const sports = await kv.get("sports") || [];
      const streams = await kv.get("streams") || [];
      events = [...movies, ...sports, ...streams];
    } else {
      events = await kv.get(category) || [];
    }

    const filteredEvents = events.filter(event =>
      event.title.toLowerCase().includes(query) ||
      event.genre.toLowerCase().includes(query) ||
      event.type.toLowerCase().includes(query)
    );

    return c.json({ data: filteredEvents });
  } catch (error) {
    console.error("Error searching events:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

Deno.serve(app.fetch);