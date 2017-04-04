/**
 * This is an alternative solution to the database solution.
 * This should be all that is needed, as the other database appears to be deleting its own everytime it is loaded
 * This comes from diigits but is simpler
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const Game = new Mongo.Collection('Game');

/****************************************
 * Below this is the scema, if you are going to change the schema please
 * Wipe the database, and add some working entries.
 *
 * Gametype: the name of the game
 * maxPlayers
 *************************************/
export const ContactsSchema = new SimpleSchema({
  category:{
    label:'category',
    type:String,
    optional:false,
    max:50,
  },
    gameType:{
      label:'gameType',
      type:String,
      optional:false,
      max:50,
    },
  maxPlayers:{
    label:'maxPlayers',
    type:Number,
    optional:false,
    min:1,
  },
  location:{
    label:'location',
    type:String,
    optional:false,
    max:80,
  },
  smokingAllowed:{
    label:'smokingAllowed',
    type:Boolean,
    optional:false,
    max:20,
  },
  firstDate:{
    label:'telephone',
    type:Date,
    optional:false,
    max:20,
  },
  reoccuring:{
      label:'reoccuring',
      type:Boolean,
      optional:false,
  },
  contact:{
    label:'contact',
    type:String,
    optional:false,
    max:20,
  },
  resources:{
    label:'resources',
    type:String,
    optional:false,
    max:50,
  },
  about:{
    label:'about',
    type:String,
    optional:false,
    max:200,
  }
});

Contacts.attachSchema(GameSchema);
