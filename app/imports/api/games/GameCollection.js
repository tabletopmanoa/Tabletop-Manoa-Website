import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
// import { Categories } from '/imports/api/categories/CategoryCollection';
// import { check } from 'meteor/check';
// import { Meteor } from 'meteor/meteor';
// import BaseCollection from '/imports/api/base/BaseCollection';

export const GameTemplate = new Mongo.Collection('GameTemplate');
/**
 * Create the schema for contacts
 */
export const GamesSchema = new SimpleSchema({
  gameName: {
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
    type: String,
    optional: true,
    max: 200,
  },
  gameLength: {
    label: 'gameLength',
    type: String,
    optional: true,
    max: 200,
  },
  date: {
    label: 'date',
    type: String,
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
    optional: true,
    max: 200,
  },
  picture: {
    label: 'picture',
    type: String,
    optional: true,
    max: 200,
  },
  smoking: {
    label: 'smoking',
    type: Boolean,
    optional: true,
  },
  alcohol: {
    label: 'alcohol',
    type: Boolean,
    optional: true,
  },
  recurring: {
    label: 'recurring',
    type: Boolean,
    optional: true,
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
    optional: true,
    max: 200,
  },
  userID: {
    label: 'userID',
    type: String,
    optional: false,
    max: 200,
  },
  gameID: {
    label: 'gameID',
    type: String,
    optional: true,
  },
  cancelled: {
    label: 'cancelled',
    type: Boolean,
    optional: false,
  },
});
/*
 define ({
 gameName,
 category = '',
 maxPlayers = '',
 gameLength = '',
 date = '',
 location = '',
 about = '',
 picture = '',
 smoking = false,
 alcohol = false,
 recurring = false,
 contact = '',
 resources = '',
 userID = '',
 cancelled = false
 })
 {
 const checkPattern = {
 gameName: String,
 category: String,
 maxPlayers: String,
 gameLength: String,
 date: String,
 location: String,
 about: String,
 picture: String,
 smoking: Boolean,
 alcohol: Boolean,
 recurring: Boolean,
 contact: String,
 resources: String,
 userID: String,
 // ID: String,
 cancelled: Boolean,
 };
 check({
 gameName,
 category,
 maxPlayers,
 gameLength,
 date,
 location,
 about,
 picture,
 smoking,
 alcohol,
 recurring,
 contact,
 resources,
 userID,
 // ID,
 cancelled,
 }, checkPattern);
 return this._collection.insert({
 gameName,
 category,
 maxPlayers,
 gameLength,
 date,
 location,
 about,
 picture,
 smoking,
 alcohol,
 recurring,
 contact,
 resources,
 userID,
 // ID,
 cancelled,
 });
 }

 /**
 * Returns an object representing the Profile docID in a format acceptable to define().
 * @param docID The docID of a Profile.
 * @returns { Object } An object representing the definition of docID.
 */
/*
 dumpOne(docID)
 {
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
 const userID = doc.userID;
 // const ID = doc.ID;
 const cancelled = doc.cancelled;
 return {
 gameName,
 category,
 maxPlayers,
 gameLength,
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
 cancelled
 };
 };   */

GameTemplate.attachSchema(GamesSchema);
