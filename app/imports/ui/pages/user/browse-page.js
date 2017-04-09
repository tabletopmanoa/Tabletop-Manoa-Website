import { Template } from 'meteor/templating';
import { Listings } from '../../api/listings/ListCollection.js';

Template.Browse_Page.helpers({

  /**
   * @returns {*} All of the listings documents.
   */
  listingsList() {
    return Listings.find();
  },
});

Template.Browse_Page.onCreated(function onCreated() {
  this.subscribe('Listings');
});

