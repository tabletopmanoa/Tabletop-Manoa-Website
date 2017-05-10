import { Accounts } from 'meteor/accounts-base';
import { Games } from '/imports/api/games/GameCollection.js';
/* eslint-disable no-console */

/* Create a profile document for this user if none exists already. */
Accounts.validateNewUser(function validate(user) {
  if (user) {
    const username = user.services.cas.id;
    if (!Games.isDefined(username)) {
      Games.define({ username });
    }
  }
  // All UH users are valid for BowFolios.
  return true;
});
