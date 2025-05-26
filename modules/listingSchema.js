const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    name: String,
    summary: String,
    property_type: String,
    bedrooms: Number,
    bathrooms: Number,
    address: {
        street: String,
        suburb: String,
        country: String
    }
}, { collection: 'listingsAndReviews' }); // Explicit collection name

module.exports = mongoose.model('Listing', listingSchema);
