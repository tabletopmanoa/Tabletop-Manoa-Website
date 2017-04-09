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
  },
  gameName: {
    label: 'Title',
    type: String,
  },
  maxPlayers: {
    label: 'Maximum Players',
    type: String,
  },
});

Listings.attachSchema(ListingsSchema);
