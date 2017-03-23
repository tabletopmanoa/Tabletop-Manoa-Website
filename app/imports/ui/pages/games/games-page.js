import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Games } from '/imports/api/games/GameCollection';
import { Categories } from '/imports/api/categories/CategoryCollection';

const selectedCategoriesKey = 'selectedCategories';

export const categoryList = ['Role Playing', 'Card Games', 'Board Games', 'Miniatures'];

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
    return _.filter(allGames, games => _.intersection(games.category, selectedCategories).length > 0);
  },

  categories() {
    return _.map(categoryList,
        function setCategory(category) {
          return {
            label: category };
        });
  },
});

Template.Games_Page.events({
  'submit .filter-data-form'(event, instance) {
    event.preventDefault();
    const selectedCategories = [];
    _.each(categoryList, function setCategories (category){
      if (event.target[category].checked) {
        selectedCategories.push(event.target[category].value)
      }
    });
    instance.messageFlags.set(selectedCategoriesKey, _.map(selectedCategories, (option) => option.value));
  },
});

