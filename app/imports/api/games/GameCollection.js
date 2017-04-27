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
      smoking: {
        label: 'smoking',
        type: Boolean,
        optional: false,
      },
      alcohol: {
        label: 'alcohol',
        type: Boolean,
        optional: false,
      },
      recurring: {
        label: 'recurring',
        type: Boolean,
        optional: false,
      },
      contact: {
        label: 'contact',
        type: String,
        optional: false,
        max: 200,
      },
      resources: {
        label: 'resources',
        type: SimpleSchema.RegEx.Url,
        optional: false,
        max: 200,
      },
      userID: {
        label: 'userID',
        type: String,
        optional: false,
        max: 200,
      }
    }));
  }

  define({ gameName = '', category, maxPlayers = '', gameLength = '', date = '', location = '', about = '', picture = '', smoking = false, alcohol = false, recurring = false, contact = '', resources = '' , userID, ID}) {
    const checkPattern = {
      gameName: String,
      maxPlayers: Number,
      gameLength: String,
      about: String,
      date: Date,
      location: String,
      smoking: Boolean,
      alcohol: Boolean,
      recurring: Boolean,
      picture: String,
      contact: String
    };
    check({
      gameName,
      maxPlayers,
      location,
      smoking,
      alcohol,
      recurring,
      gameLength,
      date,
      about,
      picture,
      contact
    }, checkPattern);



    return this._collection.insert({
      gameName,
      category,
      location,
      smoking,
      alcohol,
      recurring,
      maxPlayers,
      gameLength,
      date,
      about,
      picture,
      contact,
      resources,
      userID,
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
    const smoking = doc.smoking;
    const alcohol = doc.alcohol;
    const recurring = doc.recurring;
    const about = doc.about;
    const picture = doc.picture;
    const contact = doc.contact;
    const resources = doc.resources;
    const  userID = doc.userID;
    const ID = doc.ID;
    return { gameName, category, maxPlayers, gameLength, date, location, about, picture, contact, resources, userID, ID };
  }

}

export const Games = new GameSchema();
GameTemplate.attachSchema(GameSchema);
