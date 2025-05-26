const mongoose = require('mongoose');
const Listing = require('./listingSchema');

module.exports = class ListingsDB {
  async initialize(mongoDBConnectionString) {
    try {
      await mongoose.connect(mongoDBConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("Connected to MongoDB Atlas!");
    } catch (error) {
      throw new Error("Error connecting to MongoDB: " + error);
    }
  }

  addNewListing(listingData) {
    const listing = new Listing(listingData);
    return listing.save();
  }

  getAllListings(page, perPage, name) {
    let findBy = {};
    if (name) {
      findBy.name = { $regex: name, $options: 'i' };
    }

    return Listing.find(findBy)
      .sort({ number_of_reviews: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();
  }

  getListingById(id) {
    return Listing.findById(id).exec();
  }

  updateListingById(data, id) {
    return Listing.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  deleteListingById(id) {
    return Listing.findByIdAndDelete(id).exec();
  }
};
