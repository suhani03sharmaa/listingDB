const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema to match listingsAndReviews sample dataset
const listingSchema = new Schema({
  name: String,
  summary: String,
  property_type: String,
  bedrooms: Number,
  bathrooms: Number,
  number_of_reviews: Number,
  address: {
    country: String,
    street: String,
    suburb: String,
    market: String
  }
});

module.exports = mongoose.model("Listing", listingSchema);
