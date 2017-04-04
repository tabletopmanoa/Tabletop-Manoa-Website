import { Template } from 'meteor/templating';
import { Listing } from '/app/imports/api/listings/ListCollection.js';

Template.Browse_Page.helpers({

  /**
   * @returns {*} All of the listings documents.
   */
  ListingsList() {
    return Listing.find();
  },
});

Template.Browse_Page.onCreated(function onCreated() {
  this.subscribe('Listing');
});
