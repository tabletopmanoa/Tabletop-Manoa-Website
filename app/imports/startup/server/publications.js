import { Meteor } from 'meteor/meteor';
import { Games } from '/imports/api/games/GameCollection';
import { UserToGames } from '/imports/api/games/UserToGamesCollection.js';

import { GameTemplate } from '../../api/template/template.js';

Games.publish();
UserToGames.publish();

Meteor.publish('GameTemplate', function publishContactsData() {
  return GameTemplate.find();
});
