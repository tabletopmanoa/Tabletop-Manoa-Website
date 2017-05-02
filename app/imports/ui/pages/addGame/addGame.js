import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Games, GamesSchema, GameTemplate } from '/imports/api/games/GameCollection';
// import { Categories } from '/imports/api/categories/CategoryCollection';
// import { Listings, ListingsSchema } from '/imports/api/listings/listings.js';

const displayErrorMessages = 'displayErrorMessages';

/* eslint-disable no-param-reassign */

Template.AddGame_Page.onCreated(function onCreated() {
  // this.subscribe(Categories.getPublicationName());
  // this.subscribe(Games.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = GamesSchema.namedContext('AddGame_Page');
});


Template.AddGame_Page.helpers({
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
  game() {
    return Games.findDoc(FlowRouter.getParam('username'));
  },
});

Template.AddGame_Page.events({
  'submit .game-data-form'(event, instance) {
    event.preventDefault();
    const userID = FlowRouter.getParam('username'); // schema requires username.
    const rpgGameId = document.getElementById('gameRPG');
    const cardGameId = document.getElementById('gameCARD');
    const boardGameId = document.getElementById('gameBOARD');
    const miniGameId = document.getElementById('gameMINI');
    let category = '';
    if (document.getElementById('RPG').checked) {
      category = 'Role Playing';
    } else
      if (document.getElementById('Card').checked) {
        category = 'Card';
      } else
        if (document.getElementById('Board').checked) {
          category = 'Board';
        } else {
          category = 'Miniatures';
        }
    let gameName = '';
    if (rpgGameId.options[rpgGameId.selectedIndex].value === '7') {
      gameName = event.target.enterRPG.value;
    } else
      if (rpgGameId.options[rpgGameId.selectedIndex].value > 0) {
        gameName = rpgGameId.options[rpgGameId.selectedIndex].text;
      } else
        if (cardGameId.options[cardGameId.selectedIndex].value === '7') {
          gameName = event.target.enterCard.value;
        } else
          if (cardGameId.options[cardGameId.selectedIndex].value > 0) {
            gameName = cardGameId.options[cardGameId.selectedIndex].text;
          } else
            if (boardGameId.options[boardGameId.selectedIndex].value === '7') {
              gameName = event.target.enterBoard.value;
            } else
              if (boardGameId.options[boardGameId.selectedIndex].value > 0) {
                gameName = boardGameId.options[boardGameId.selectedIndex].text;
              } else
                if (miniGameId.options[miniGameId.selectedIndex].value === '5') {
                  gameName = event.target.enterMini.value;
                } else
                  if (miniGameId.options[miniGameId.selectedIndex].value > 0) {
                    gameName = miniGameId.options[miniGameId.selectedIndex].text;
                  } else {
                    gameName = '';
                  }
    const mp = document.getElementById('Players');
    const maxPlayers = mp.options[mp.selectedIndex].text;
    const le = document.getElementById('Length');
    const gameLength = le.options[le.selectedIndex].text;
    const location = event.target.Location.value;
    const smoking = document.getElementById('Smoking').checked;
    const alcohol = document.getElementById('Alcohol').checked;
    const date1 = event.target.date.value;
    const time1 = event.target.time.value;
    const space = ' ';
    const date = date1 + space + time1;
    const recurring = document.getElementById('Recurring').checked;
    const contact = event.target.contact.value;
    const resources = event.target.resources.value;
    const picture = event.target.imageURL.value;
    const about = event.target.about.value;
    const gameID = new Date().getTime();
    const cancelled = false;

    const defineObject = {
      gameName,
      category,
      maxPlayers,
      gameLength,
      date,
      location,
      about,
      smoking,
      alcohol,
      recurring,
      contact,
      resources,
      picture,
      userID,
      gameID,
      cancelled,
    };


    // Clear out any old validation errors.
    // instance.context.resetValidation();
    // Invoke clean so that newGameData reflects what will be inserted.
    // GamesSchema.clean(newGameData);
    // Determine validity.
    // instance.context.validate(newGameData);

    if (instance.context.isValid()) {
      alert('Your game group has been successfully added.');
      // GameTemplate.insert(newGameData);

      Games.define(defineObject);
      Games.publish();
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go(FlowRouter.path('Manage_Page', FlowRouter.current().params));
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
