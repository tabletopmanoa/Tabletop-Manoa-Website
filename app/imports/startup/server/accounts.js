import { Accounts } from 'meteor/accounts-base';
import { UserToGames } from '/imports/api/games/UserToGamesCollection.js';

/* eslint-disable no-console */

/* Create a profile document for this user if none exists already. */
Accounts.validateNewUser(function validate(user) {
  if (user) {
    const username = user.services.cas.id;
    if (!UserToGames.isDefined(username)) {
      UserToGames.define({ username });
    }
  }
  // All UH users are valid for BowFolios.
  return true;
});
