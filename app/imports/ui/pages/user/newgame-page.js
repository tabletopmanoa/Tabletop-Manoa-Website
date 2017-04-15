import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Games } from '/imports/api/games/GameCollection';
// import { Categories } from '/imports/api/categories/CategoryCollection';
import { Listings, ListingsSchema } from '/imports/api/listings/listings.js';

const displayErrorMessages = 'displayErrorMessages';

/* eslint-disable no-param-reassign */

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
});

Template.NewGame_Page.events({
  'submit .game-data-form'(event, instance) {
    event.preventDefault();
    const username = FlowRouter.getParam('username'); // schema requires username.
    console.log(username);
    // const category = event.target.Category.value;
    const rpgGameId = document.getElementById('gameRPG');
    const cardGameId = document.getElementById('gameCARD');
    const boardGameId = document.getElementById('gameBOARD');
    const miniGameId = document.getElementById('gameMINI');
    let gameName = '';
    if (rpgGameId.options[rpgGameId.selectedIndex].value > 0) {
      gameName = rpgGameId.options[rpgGameId.selectedIndex].text;
    } else if (cardGameId.options[cardGameId.selectedIndex].value > 0) {
      gameName = cardGameId.options[cardGameId.selectedIndex].text;
    } else if (boardGameId.options[boardGameId.selectedIndex].value > 0) {
      gameName = boardGameId.options[boardGameId.selectedIndex].text;
    } else {
      gameName = miniGameId.options[miniGameId.selectedIndex].text;
    }
    console.log(gameName);
    const mp = document.getElementById('Players');
    const maxPlayers = mp.options[mp.selectedIndex].text;
    console.log(maxPlayers);
    const le = document.getElementById('Length');
    const gameLength = le.options[le.selectedIndex].text;
    console.log(gameLength);
    const location = event.target.Location.value;
    console.log(location);
    // const smoking = event.target.smoking.value;
    // const alcohol = event.target.alcohol.value;

    const date = event.target.date.value;
    console.log(date);
    const time = event.target.time.value;
    console.log(time);

    // const recurring = event.target.recurring.value;
    const contact = event.target.contact.value;
    console.log(contact);
    const resources = event.target.resources.value;
    console.log(resources);
    const about = event.target.about.value;
    console.log(about);

    const newGameData = { gameName, maxPlayers, gameLength, location, date, time, contact, resources, about };
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
