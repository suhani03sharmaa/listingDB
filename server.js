/*********************************************************************************
 * WEB422 – Assignment 1
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Suhani Sharma     Student ID: 144675238      Date: 2025-05-24
 * Published URL: https://your-api-name.vercel.app
 ********************************************************************************/

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const ListingsDB = require("./modules/listingsDB.js");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const db = new ListingsDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Listening" });
});

app.post("/api/listings", async (req, res) => {
  try {
    const newListing = await db.addNewListing(req.body);
    res.status(201).json(newListing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/listings", async (req, res) => {
  const { page, perPage, name } = req.query;
  try {
    const listings = await db.getAllListings(
      parseInt(page),
      parseInt(perPage),
      name
    );
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/listings/:id", async (req, res) => {
  try {
    const listing = await db.getListingById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Not found" });
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/api/listings/:id", async (req, res) => {
  try {
    await db.updateListingById(req.body, req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/api/listings/:id", async (req, res) => {
  try {
    await db.deleteListingById(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

db.initialize(process.env.MONGODB_CONN_STRING)
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`Server listening on port: ${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database initialization failed:", err);
  });
