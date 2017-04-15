import { Listings } from '../../api/listings/listings.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Listings to pre-fill the Collection.
 * @type {*[]}
 */
const listingSeeds = [
  {
    gameName: 'Poker',
    maxPlayers: '10+ players',
    gameLength: '4+ Hours ',
    location: 'Campus Center',
    date: '12/25/2017',
    time: '1:00 pm',
    contact: 'help@WSOP.com',
    resources: 'WSOP.com',
    about: '45 man tournament.  Free to enter.  1st place: Las Vegas trip.  Trip provided by Aria Hotel and Casino',
  },
  {
    gameName: 'Chess',
    maxPlayers: '4 players',
    gameLength: '4+ Hours ',
    location: 'Campus Center',
    date: '7/4/2017',
    time: '6:00 pm',
    contact: 'chess@hawaii.edu',
    resources: 'chess.com',
    about: 'Inviting experienced Chess players to a nice friendly game.  Food and drinks will be provided.',
  },
];

/**
 * Initialize the Stuff collection if empty with seed data.
 */
if (Listings.find().count() === 0) {
  _.each(listingSeeds, function seedListings(listings) {
    Listings.insert(listings);
  });
}
