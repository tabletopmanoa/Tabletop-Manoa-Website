import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { Categories } from '/imports/api/categories/CategoryCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

/** @module Profile */

/**
 * Profiles provide portfolio data for a user.
 * @extends module:Base~BaseCollection
 */
class ListCollection extends BaseCollection {

  /**
   * Creates the Listings collection.
   */
  constructor() {
    super('Listings', new SimpleSchema({
      gameName: { type: String },
      category: { type: [String], optional: true },
      maxPlayers: { type: Number, optional: true },
    }));
  }

    define({ category = '', gameName = '',  maxPlayers = '' })
  {
    const checkPattern = { category: String, gameName: String, maxPlayers: Number };
    check({ category, gameName, maxPlayers });
    return this._collection.insert({ category, gameName, maxPlayers });
  }

  /**
   * Returns an object representing the Profile docID in a format acceptable to define().
   * @param docID The docID of a Profile.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const gameName = doc.gameName;
    const category = doc.category;
    const maxPlayers = doc.maxPlayers;

    return { category, gameName, maxPlayers };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Listings = new ListCollection();
Listing = new Mongo.Collection('listing');
