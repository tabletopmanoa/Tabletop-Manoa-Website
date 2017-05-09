import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
// import { Categories } from '/imports/api/categories/CategoryCollection';
import { check } from 'meteor/check';
// import { Meteor } from 'meteor/meteor';
import BaseCollection from '/imports/api/base/BaseCollection';


export const GamesTemplate = new Mongo.Collection('GamesTemplate');

class GameSchema extends BaseCollection {

  /**
   * Create the schema for contacts
   */
  constructor() {
    super('Games', new SimpleSchema({
      title: {
        label: 'Name of Game',
        type: String,
        optional: false,
        max: 200,
      },
      category: {
        label: 'category',
        type: String,
        optional: false,
        max: 200,
      },
      maxPlayers: {
        label: 'maxPlayers',
        type: Number,
        optional: false,
        max: 200,
      },
      date: {
        label: 'date',
        type: String,
        optional: false,
      },
      start: {
        label: 'startTime',
        type: String,
        optional: false,
        max: 200,
      },
      end: {
        label: 'endTime',
        type: String,
        optional: false,
        max: 200,
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
      },
    }));
  }

  define({
      title = '',
      category = '',
      maxPlayers = '',
      date = '',
      start = '',
      end = '',
      location = '',
      about = '',
      picture = '',
      smoking = false,
      alcohol = false,
      recurring = false,
      contact = '',
      resources = '',
      userID,
  }) {
    const checkPattern = {
      title: String,
      maxPlayers: Number,
      start: String,
      end: String,
      about: String,
      date: String,
      location: String,
      smoking: Boolean,
      alcohol: Boolean,
      recurring: Boolean,
      picture: String,
      contact: String,
    };
    check({
      title,
      maxPlayers,
      location,
      smoking,
      alcohol,
      recurring,
      start,
      end,
      date,
      about,
      picture,
      contact,
    }, checkPattern);

    return this._collection.insert({
      title,
      category,
      location,
      smoking,
      alcohol,
      recurring,
      maxPlayers,
      start,
      end,
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
    const title = doc.title;
    // const title = gameName;
    const category = doc.category;
    const maxPlayers = doc.maxPlayers;
    const end = doc.end;
    const start = doc.start;
    const date = doc.date;
    const startDate = date;
    const location = doc.location;
    const smoking = doc.smoking;
    const alcohol = doc.alcohol;
    const recurring = doc.recurring;
    const about = doc.about;
    const picture = doc.picture;
    const contact = doc.contact;
    const resources = doc.resources;
    const userID = doc.userID;
    const id = userID;
    // const start = startTime;
    // const end = endTime;
    const allDay = false;
    // const ID = doc.ID;
    return {
      gameName,
      title,
      startDate,
      category,
      maxPlayers,
      startTime,
      endTime,
      date,
      location,
      smoking,
      alcohol,
      recurring,
      about,
      picture,
      contact,
      resources,
      userID,
      id,
      end,
      allDay,
    };
  }
}

export const Games = new GameSchema();
GamesTemplate.attachSchema(GameSchema);

