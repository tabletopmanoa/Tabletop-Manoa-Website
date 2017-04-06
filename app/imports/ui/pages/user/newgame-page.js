import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Games } from '/imports/api/games/GameCollection';
import { Categories } from '/imports/api/categories/CategoryCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

export const categoryList = ['Role Playing Games', 'Card Games', 'Board Games', 'Miniatures'];
export const gamerpgObjects = [{ label: 'Dungeons & Dragons', value: '1' },
  { label: 'Shadowrun', value: '2' },
  { label: 'Call of Cthulhu', value: '3' },
  { label: 'Vampire: The Masquerade', value: '4' },
  { label: 'Star Wars The Roleplaying Game', value: '5' },
  { label: 'Pathfinder Roleplaying Game', value: '6' },
  { label: 'Other', value: '7' }];
export const gamecardObjects = [{ label: 'Poker', value: '1' },
  { label: 'Rummy', value: '2' },
  { label: 'Cribbage', value: '3' },
  { label: 'Spades', value: '4' },
  { label: 'Mahjong', value: '5' },
  { label: 'Other', value: '6' }];
export const gameboardObjects = [{ label: 'Chess', value: '1' },
  { label: 'Monopoly', value: '2' },
  { label: 'Scrabble', value: '3' },
  { label: 'Backgammon', value: '4' },
  { label: 'Other', value: '5' }];
export const gameminiObjects = [{ label: 'Star Wars: X-Wing', value: '1' },
  { label: 'War Machine', value: '2' },
  { label: 'Hordes', value: '3' },
  { label: 'War Hammer', value: '4' },
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
export const alcoholList = ['Allowed'];
export const reoccurringList = ['Reoccurring'];

Template.NewGame_Page.onCreated(function onCreated() {
  this.subscribe(Categories.getPublicationName());
  this.subscribe(Games.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = Games.getSchema().namedContext('NewGame_Role_Playing_Page');
});

Template.NewGame_Page.helpers({
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
  categories() {
    return _.map(categoryList, function makeCategoryObject(category) {
      return { label: category };
    });
  },
  // Not sure what this does
  game() {
    return Games.findDoc(FlowRouter.getParam('username'));
  },
  gamesrpg() {
    return gamerpgObjects;
  },
  gamescard() {
    return gamecardObjects;
  },
  gamesboard() {
    return gameboardObjects;
  },
  gamesmini() {
    return gameminiObjects;
  },
  players() {
    return maxPlayerObjects;
  },
  gameLength() {
    return lengthObjects;
  },
  smoking() {
    return _.map(smokingList, function makeSmokingObject(smoking) {
      return { label: smoking };
    });
  },
  alcohol() {
    return _.map(alcoholList, function makeAlcoholObject(alcohol) {
      return { label: alcohol };
    });
  },
  reoccurring() {
    return _.map(reoccurringList, function makeReoccurringObject(reoccurring) {
      return { label: reoccurring };
    });
  },
});

Template.NewGame_Page.events({
  'submit .game-data-form'(event, instance) {
    event.preventDefault();
    const username = FlowRouter.getParam('username'); // schema requires username.
// category
    const gameName = event.target.gameName.value;
    const maxPlayers = event.target.maxPlayers.value;
    const gameLength = event.target.gameLength.value;
    const location = event.target.location.value;
    const smoking = event.target.smoking.value;
    const alcohol = event.target.alchohol.value;
    const about = event.target.about.value;
    //date
    //time
    const reoccurring = event.target.reoccurring.value;
    const contact = event.target.contact.value;
    const resources = event.target.resources.value;
    //const category = _.map(selectedCategories, (option) => option.value);
    //
    // const updatedGameData = { gameName, category, maxPlayers, gameLength, location, about, contact, resources ,username };
    const updatedGameData = { username, gameName, maxPlayers, gameLength, location, smoking, alcohol, about, reoccurring, contact, resources };

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
