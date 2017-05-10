import { Meteor } from 'meteor/meteor';
import { Games } from '/imports/api/games/GameCollection';
import { UserToGames } from '/imports/api/games/UserToGamesCollection.js';
import { Listings } from '/imports/api/listings/listings.js';

Meteor.publish('Listings', function publishListingsData() {
  return Listings.find();
});

import { GameTemplate } from '../../api/template/template.js';

Games.publish();
UserToGames.publish();

Meteor.publish('GameTemplate', function publishContactsData() {
  return GameTemplate.find();
});
