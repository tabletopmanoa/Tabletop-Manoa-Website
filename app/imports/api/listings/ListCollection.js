import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

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
    label: 'Maxplayers',
    type: String,
    optional: true,
    max: 100,
  },
});

Listings.attachSchema(ListingsSchema);
