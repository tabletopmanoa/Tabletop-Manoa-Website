import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Games } from '/imports/api/games/GameCollection';
// import { Categories } from '/imports/api/categories/CategoryCollection';
import { Listings, ListingsSchema } from '/imports/api/listings/listings.js';

const displayErrorMessages = 'displayErrorMessages';

/* eslint-disable no-param-reassign */

export const gamerpgObjects = [{ label: 'Dungeons & Dragons', value: 'Du' },
  { label: 'Shadowrun', value: 'Sh' },
  { label: 'Call of Cthulhu', value: 'Ct' },
  { label: 'Vampire: The Masquerade', value: 'Va' },
  { label: 'Star Wars The Roleplaying Game', value: 'St' },
  { label: 'Pathfinder Roleplaying Game', value: 'Pa' },
  { label: 'Other', value: 'Ot' }];
export const gamecardObjects = [{ label: 'Poker', value: 'Poker' },
  { label: 'Rummy', value: 'Rummy' },
  { label: 'Cribbage', value: 'Cribbage' },
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
export const maxPlayerObjects = [{ label: '2 players', value: '2 players' },
  { label: '3 players', value: '3 players' },
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
  { label: '4 hours+', value: '4' }];
export const smokingList = ['Allowed'];
export const alcoholList = ['Allowed'];
export const recurringList = ['Recurring'];

Template.NewGame_Page.onCreated(function onCreated() {
  // this.subscribe(Categories.getPublicationName());
  // this.subscribe(Games.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = ListingsSchema.namedContext('NewGame_Page');
});

Template.NewGame_Page.helpers({
  routeUserName() {
    return FlowRouter.getParam('username');
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  fieldError(fieldName) {
    const invalidKeys = Template.instance().context.invalidKeys();
    const errorObject = _.find(invalidKeys, (keyObj) => keyObj.name === fieldName);
    return errorObject && Template.instance().context.keyErrorMessage(errorObject.name);
  },
/*  categories() {
    return _.map(categoryList, function makeCategoryObject(category) {
      return { label: category };
    });
  },
  */
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
  recurring() {
    return _.map(recurringList, function makeRecurringObject(recurring) {
      return { label: recurring };
    });
  },
});

Template.NewGame_Page.events({
  'submit .game-data-form'(event, instance) {
    event.preventDefault();
    const username = FlowRouter.getParam('username'); // schema requires username.
    console.log(username);
    // const category = event.target.Category.value;
    const gameName = 'Texas';
    console.log(gameName);
    const gameName2 = event.target.Game.value;
    console.log(gameName2);
    const maxPlayers = event.target.Maxplayers.value;
    console.log(maxPlayers);

    // const gameLength = event.target.gameLength.value;

    // const location = event.target.Location.value;
    // console.log(location);

    /*  const smoking = event.target.smoking.value;
    const alcohol = event.target.alcohol.value;
    const about = event.target.about.value;
    const date = event.target.date.value;
    const time = event.target.time.value;
    const recurring = event.target.recurring.value;
    const contact = event.target.contact.value;
    const resources = event.target.resources.value;
     */

    const newGameData = { gameName, maxPlayers };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newGameData reflects what will be inserted.
    ListingsSchema.clean(newGameData);
    // Determine validity.
    instance.context.validate(newGameData);

    if (instance.context.isValid()) {
      Listings.insert(newGameData);
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go(FlowRouter.path('Browse_Page', FlowRouter.current().params));
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
