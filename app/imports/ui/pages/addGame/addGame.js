import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { GameTemplate, GameSchema } from '../../../api/template/template.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import { Games } from '/imports/api/games/GameCollection';
import { Categories } from '/imports/api/categories/CategoryCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

export const gameObjects = [{ label: 'Chess', value: '1' },
  { label: 'Monopoly', value: '2' },
  { label: 'Scrabble', value: '3' },
  { label: 'Backgammon', value: '4' },
  { label: 'Other', value: '5' }];

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


Template.AddGame_Page.onCreated(function onCreated() {
  this.subscribe(Categories.getPublicationName());
  this.subscribe(Games.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = GameSchema.namedContext('AddGame_Page');
});

Template.AddGame_Page.helpers({
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
  smoking() {
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


Template.AddGame_Page.events({
  'submit .contact-data-form'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const gameName = event.target.GameName.value;
    const category = event.target.Category.value;
    const maxPlayers = event.target.MaxPlayers.value;
    const gameLength = event.target.GameLength.value;
    const location = event.target.Location.value;
    const about = event.target.About.value;
    const picture = event.target.Picture.value;
    const contact = event.target.Contact.value;
    const resources = event.target.Resources.value;

    const newContactData = { gameName, category, maxPlayers, gameLength, location, about, picture, contact, resources };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newContactData reflects what will be inserted.
   GameSchema.clean(newContactData);
    // Determine validity.
    instance.context.validate(newContactData);
    if (instance.context.isValid()) {
      GameTemplate.insert(newContactData);
      instance.messageFlags.set(displayErrorMessages, false);
      const username = Meteor.user().profile.name;
      FlowRouter.go(`/${username}/template`);
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});