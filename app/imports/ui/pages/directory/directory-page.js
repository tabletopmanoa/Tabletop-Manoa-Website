import { Template } from 'meteor/templating';
import { UserToGames } from '/imports/api/games/UserToGamesCollection.js';

Template.Directory_Page.onCreated(function onCreated() {
  this.subscribe(UserToGames.getPublicationName());
});

Template.Directory_Page.helpers({

  /**
   * Returns a cursor to UserToGames, sorted by last name.
   */
  UserToGames() {
    return UserToGames.find({}, { sort: { lastName: 1 } });
  },
});
