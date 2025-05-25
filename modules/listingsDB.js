const mongoose = require("mongoose");
const Listing = require("./listingSchema");

module.exports = class ListingsDB {
  constructor() {
    this.ListingModel = null;
  }

  async initialize(connectionString) {
    try {
      await mongoose.connect(connectionString);
      this.ListingModel = Listing;
    } catch (err) {
      throw err;
    }
  }

  async addNewListing(data) {
    const listing = new this.ListingModel(data);
    return await listing.save();
  }

  async getAllListings(page, perPage, name) {
    const query = name ? { name: new RegExp(name, "i") } : {};
    const skipAmount = (page - 1) * perPage;

    return await this.ListingModel.find(query)
      .sort({ number_of_reviews: -1 })
      .skip(skipAmount)
      .limit(perPage)
      .exec();
  }

  async getListingById(id) {
    return await this.ListingModel.findById(id).exec();
  }

  async updateListingById(data, id) {
    return await this.ListingModel.updateOne({ _id: id }, { $set: data }).exec();
  }

  async deleteListingById(id) {
    return await this.ListingModel.deleteOne({ _id: id }).exec();
  }
};
