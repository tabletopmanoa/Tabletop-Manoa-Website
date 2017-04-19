import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Listings = new Mongo.Collection('Listings');
/**
 *  Creating the schema for GameData
 */
export const ListingsSchema = new SimpleSchema({
  category: {
    label: 'Category',
    type: String,
    optional: false,
    max: 100,
  },
  gameName: {
    label: 'Game',
    type: String,
    optional: false,
    max: 100,
  },
  maxPlayers: {
    label: 'Players',
    type: String,
    optional: true,
    max: 100,
  },
  gameLength: {
    label: 'Length',
    type: String,
    optional: true,
    max: 100,
  },
  location: {
    label: 'Location',
    type: String,
    optional: true,
    max: 100,
  },
  smoking: {
    label: 'Smoking',
    type: Boolean,
    optional: true,
  },
  alcohol: {
    label: 'Alcohol',
    type: Boolean,
    optional: true,
  },
  date: {
    label: 'Date',
    type: String,
    optional: true,
    max: 100,
  },
  time: {
    label: 'Time',
    type: String,
    optional: true,
    max: 100,
  },
  recurring: {
    label: 'Recurring',
    type: Boolean,
    optional: true,
  },
  contact: {
    label: 'Contact',
    type: String,
    optional: true,
    max: 100,
  },
  resources: {
    label: 'Resources',
    type: String,
    optional: true,
    max: 100,
  },
  about: {
    label: 'About',
    type: String,
    optional: true,
    max: 300,
  },

});

Listings.attachSchema(ListingsSchema);
