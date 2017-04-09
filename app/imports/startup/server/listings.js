import { Listings } from '../../api/listings/ListCollection.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Listings to pre-fill the Collection.
 * @type {*[]}
 */
const listingSeeds = [
  {
    category: 'Card',
    gameName: 'Omaha',
    maxPlayers: '20',
  },
  {
    category: 'Card',
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
