import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Games } from '/imports/api/games/GameCollection';
import { Categories } from '/imports/api/categories/CategoryCollection';

const selectedCategoriesKey = 'selectedCategories';

Template.Games_Page.onCreated(function onCreated() {
  this.subscribe(Games.getPublicationName());
  this.subscribe(Categories.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(selectedCategoriesKey, undefined);
});

Template.Games_Page.helpers({
  games() {
    // Initialize selectedInterests to all of them if messageFlags is undefined.
    if (!Template.instance().messageFlags.get(selectedCategoriesKey)) {
      Template.instance().messageFlags.set(selectedCategoriesKey, _.map(Categories.findAll(), category => category.name));
    }
    // Find all games with the currently selected interests.
    const allGames = Games.findAll();
    const selectedCategories = Template.instance().messageFlags.get(selectedCategoriesKey);
    return _.games(allGames, games => _.intersection(games.category, selectedCategories).length > 0);
  },

  categories() {
    return _.map(Categories.findAll(),
        function makeCategoriesObject(category) {
          return {
            label: category.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedCategoriesKey), category.name),
          };
        });
  },
});

Template.Games_Page.events({
  'submit .games-data-form'(event, instance) {
    event.preventDefault();
    const selectedOptions = _.games(event.target.Categories.selectedOptions, (option) => option.selected);
    instance.messageFlags.set(selectedCategoriesKey, _.map(selectedOptions, (option) => option.value));
  },
});

