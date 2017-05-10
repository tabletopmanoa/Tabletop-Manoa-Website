import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { UserToGames } from '/imports/api/games/UserToGamesCollection.js';
import { Games } from '/imports/api/games/GameCollection.js';

const selectedGamesKey = 'selectedGames';

Template.Filter_Page.onCreated(function onCreated() {
  this.subscribe(Games.getPublicationName());
  this.subscribe(UserToGames.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(selectedGamesKey, undefined);
});

Template.Filter_Page.helpers({
  UserToGames() {
    // Initialize selectedGames to all of them if messageFlags is undefined.
    if (!Template.instance().messageFlags.get(selectedGamesKey)) {
      Template.instance().messageFlags.set(selectedGamesKey, _.map(Games.findAll(), interest => interest.name));
    }
    // Find all UserToGames with the currently selected Games.
    const allUserToGames = UserToGames.findAll();
    const selectedGames = Template.instance().messageFlags.get(selectedGamesKey);
    return _.filter(allUserToGames, profile => _.intersection(profile.Games, selectedGames).length > 0);
  },

  Games() {
    return _.map(Games.findAll(),
        function makeInterestObject(interest) {
          return {
            label: interest.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedGamesKey), interest.name),
          };
        });
  },
});

Template.Filter_Page.events({
  'submit .filter-data-form'(event, instance) {
    event.preventDefault();
    const selectedOptions = _.filter(event.target.Games.selectedOptions, (option) => option.selected);
    instance.messageFlags.set(selectedGamesKey, _.map(selectedOptions, (option) => option.value));
  },
});

