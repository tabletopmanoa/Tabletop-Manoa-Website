import { Listings } from '../../api/listings/listings.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Listings to pre-fill the Collection.
 * @type {*[]}
 */
const listingSeeds = [
  {
    gameName: 'Omaha',
    maxPlayers: '20',
  },
  {
    gameName: 'Blackjack',
    maxPlayers: '25',
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
