import { Meteor } from 'meteor/meteor';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Categories } from '/imports/api/categories/CategoryCollection';
import { Games } from '/imports/api/games/GameCollection';
import { Listings } from '/imports/api/listings/listings.js';

Meteor.publish('Listings', function publishListingsData() {
  return Listings.find();
});

Interests.publish();
Profiles.publish();
Categories.publish();
Games.publish();

