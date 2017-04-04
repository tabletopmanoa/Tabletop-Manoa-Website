/**
 * Created by koday on 3/5/2017.
 */
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const GameTemplate = new Mongo.Collection('GameTemplate');

/**
 * Create the schema for contacts
 */
export const GameSchema = new SimpleSchema({
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
    optional: false,
    max: 200,
  },
  gameLength: {
    label: 'gameLength',
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
});

GameTemplate.attachSchema(GameSchema);
