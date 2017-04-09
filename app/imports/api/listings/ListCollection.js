import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

export const Listing = new Mongo.Collection('listing');
/**
 *  Creating the schema for GameData
 */
export const GameDataSchema = new SimpleSchema({
  username: {
    label: 'User name',
    type: String,
  },
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

Listing.attachSchema(GameDataSchema);
