import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Listings = new Mongo.Collection('Listings');
/**
 *  Creating the schema for GameData
 */
export const ListingsSchema = new SimpleSchema({

  gameName: {
    label: 'Game',
    type: String,
    optional: false,
    max: 100,
  },
  maxPlayers: {
    label: 'Maxplayers',
    type: String,
    optional: true,
    max: 100,
  },
});

Listings.attachSchema(ListingsSchema);
