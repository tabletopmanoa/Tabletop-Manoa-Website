/**
 * Created by koday on 3/5/2017.
 */
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Categories } from '/imports/api/categories/CategoryCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import BaseCollection from '/imports/api/base/BaseCollection';

export const GameTemplate = new Mongo.Collection('GameTemplate');

class GameSchema extends BaseCollection {

  /**
   * Create the schema for contacts
   */
  constructor() {
    super('Games', new SimpleSchema({
      gameName: {
        label: 'Name of Game',
        type: String,
        optional: false,
        max: 200,
      },
      category: {
        label: 'category',
        type: [String],
        optional: false,
        max: 200,
      },
      maxPlayers: {
        label: 'maxPlayers',
        type: Number,
        optional: false,
        max: 200,
      },
      gameLength: {
        label: 'gameLength',
        type: String,
        optional: false,
        max: 200,
      },
      date: {
        label: 'date',
        type: Date,
        optional: false,
      },
      location: {
        label: 'location',
        type: String,
        optional: false,
        max: 200,
      },
      about: {
        label: 'about',
        type: String,
        optional: false,
        max: 200,
      },
      picture: {
        label: 'picture',
        type: String,
        optional: false,
        max: 200,
      },
      contact: {
        label: 'contact',
        type: String,
        optional: false,
        max: 200,
      },
      resources: {
        label: 'resources',
        type: String,
        optional: false,
        max: 200,
      },
    }));
  }

  define({ gameName = '', category, maxPlayers = '', gameLength = '', date = '', location = '', about = '', picture = '', contact = '', resources = '' }) {
    const checkPattern = {
      gameName: String, maxPlayers: Number, gameLength: String, about: String, date: Date, location: String, picture: String,
      contact: String,
    };
    check({ gameName, maxPlayers, location, gameLength, date, about, picture, contact }, checkPattern);

    // Throw an error if any of the passed Categories names are not defined.
    return this._collection.insert({
      gameName,
      category,
      location,
      maxPlayers,
      gameLength,
      date,
      about,
      picture,
      contact,
      resources,
    });
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
    const date = doc.date;
    const location = doc.location;
    const about = doc.about;
    const picture = doc.picture;
    const contact = doc.contact;
    const resources = doc.resources;
    return { gameName, category, maxPlayers, gameLength, date, location, about, picture, contact, resources };
  }
}

export const Games = new GameSchema();
GameTemplate.attachSchema(GameSchema);
