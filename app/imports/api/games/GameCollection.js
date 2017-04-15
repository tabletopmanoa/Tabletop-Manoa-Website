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
class GameCollection extends BaseCollection {

  /**
   * Creates the Game collection.
   */
  constructor() {
    super('Games', new SimpleSchema({
      gameName: { type: String },
      category: { type: [String], optional: true },
      maxPlayers: { type: Number, optional: true },
      gameLength: { type: String, optional: true },
      location: { type: String, optional: true },

      about: { type: String, optional: true },

      picture: { type: SimpleSchema.RegEx.Url, optional: true },
      contact: { type: SimpleSchema.RegEx.Url, optional: true },
      resources: { type: SimpleSchema.RegEx.Url, optional: true },
    }));
  }

    define({ gameName = '', category,  maxPlayers = '', gameLength = '', location='', about = '', picture = '', contact = '', resources = ''})
  {
    const checkPattern = { gameName: String, maxPlayers: Number, gameLength: String, about: String, location: String, picture: String,
      contact: String };
    check({ gameName, category, maxPlayers, location, gameLength, about, picture, contact, resources }, checkPattern);

    // Throw an error if any of the passed Categories names are not defined.
    Categories.assertNames(category);
    return this._collection.insert({ gameName, category, location, maxPlayers, gameLength, about, picture, contact, resources });
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
    const gameLength = doc.gameLength;
    const location = doc.location;
    const about = doc.about;
    const picture = doc.picture;
    const contact = doc.contact;
    const resources = doc.resources;
    return { gameName, category, maxPlayers, gameLength, location, about, picture, contact, resources };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Games = new GameCollection();
