import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Games } from '/imports/api/games/GameCollection';
import { Categories } from '/imports/api/categories/CategoryCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

export const gameObjects = [{ label: 'Poker', value: '1' },
  { label: 'Rummy', value: '2' },
  { label: 'Cribbage', value: '3' },
  { label: 'Spades', value: '4' },
  { label: 'Mahjong', value: '5' },
  { label: 'Other', value: '6' }];

export const maxPlayerObjects = [{ label: '2 players', value: '2' },
  { label: '3 players', value: '3' },
  { label: '4 players', value: '4' },
  { label: '5 players', value: '5' },
  { label: '6 players', value: '6' },
  { label: '7 players', value: '7' },
  { label: '8 players', value: '8' },
  { label: '9 players', value: '9' },
  { label: '10+ players', value: '10' }];

export const lengthObjects = [{ label: '1 hour', value: '1' },
  { label: '2 hours', value: '2' },
  { label: '3 hours', value: '3' },
  { label: '4+ hours', value: '4' }];

export const smokingList = ['Allowed'];
export const reoccurringList = ['Reoccurring'];

Template.NewGame_Card_Games_Page.onCreated(function onCreated() {
  this.subscribe(Categories.getPublicationName());
  this.subscribe(Games.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = Games.getSchema().namedContext('Game_Page');
});

Template.NewGame_Card_Games_Page.helpers({
  successClass() {
    return Template.instance().messageFlags.get(displaySuccessMessage) ? 'success' : '';
  },
  displaySuccessMessage() {
    return Template.instance().messageFlags.get(displaySuccessMessage);
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  fieldError(fieldName) {
    const invalidKeys = Template.instance().context.invalidKeys();
    const errorObject = _.find(invalidKeys, (keyObj) => keyObj.name === fieldName);
    return errorObject && Template.instance().context.keyErrorMessage(errorObject.name);
  },
  game() {
    return Games.findDoc(FlowRouter.getParam('username'));
  },
  games() {
    return gameObjects;
  },
  players() {
    return maxPlayerObjects;
  },
  gameLength() {
    return lengthObjects;
  },
  smokingAlcohol() {
    return _.map(smokingList, function makeSmokingObject(smoking) { return { label: smoking }; });
  },
  reoccurring() {
    return _.map(reoccurringList, function makeReoccurringObject(reoccurring) { return { label: reoccurring }; });
  },
  categories() {
    const game = Games.findDoc(FlowRouter.getParam('username'));
    const selectedCategories = game.categories;
    return game && _.map(Categories.findAll(),
            function makeInterestObject(category) {
              return { label: category.name, selected: _.contains(selectedCategories, category.name) };
            });
  },
});

Template.NewGame_Card_Games_Page.events({
  'submit .game-data-form'(event, instance) {
    event.preventDefault();
    const selectedCategories = _.filter(event.target.Categories.selectedOptions, (option) => option.selected);
    const gameName = event.target.gameName.value;
    const maxPlayers = event.target.maxPlayers.value;
    const username = FlowRouter.getParam('username'); // schema requires username.
    const gameLength = event.target.gameLength.value;
    const location = event.target.location.value;
    const about = event.target.about.value;
    const contact = event.target.contact.value;
    const resources = event.target.resources.value;
    const category = _.map(selectedCategories, (option) => option.value);
    const updatedGameData = { gameName, category, maxPlayers, gameLength, location, about, contact, resources,
    username };

    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that updatedProfileData reflects what will be inserted.
    Games.getSchema().clean(updatedGameData);
    // Determine validity.
    instance.context.validate(updatedGameData);

    if (instance.context.isValid()) {
      const docID = Games.findDoc(FlowRouter.getParam('username'))._id;
      const id = Games.update(docID, { $set: updatedGameData });
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

