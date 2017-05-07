import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Games } from '/imports/api/games/GameCollection';
import { Session } from 'meteor/session';

const displayErrorMessages = 'displayErrorMessages';

/* eslint-disable no-param-reassign */

Template.AddGame_Page.onCreated(
    function onCreated() {
      this.messageFlags = new ReactiveDict();
      this.messageFlags.set(displayErrorMessages, false);
      this.context = Games.getSchema().namedContext('AddGame_Page');
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
        if (cardGameId.options[cardGameId.selectedIndex].value === '10') {
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
    const maxPlayers = parseInt(document.getElementById('Players').value, 10);
    const le = document.getElementById('Length');
    const gameLength = le.options[le.selectedIndex].text;
    const location = event.target.Location.value;
    const smoking = document.getElementById('Smoking').checked;
    const alcohol = document.getElementById('Alcohol').checked;
    const date1 = event.target.date.value;
    const time1 = event.target.time.value;
    const space = ' ';
    const dateStr = date1 + space + time1;
    const date = new Date (dateStr);
    const recurring = document.getElementById('Recurring').checked;
    const contact = event.target.contact.value;
    const resources = event.target.resources.value;
    const picture = event.target.imageURL.value;
    const about = event.target.about.value;
    const imageURL = event.target.imageURL.value;
    // difference between picture and imageURL?
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
      imageURL,
      cancelled,
    };

    if (instance.context.isValid()) {
      window.alert('Your game group has been successfully added.');  // eslint-disable-line no-alert
      Games.define(defineObject);
      Games.publish();

      // Store the date so it can be used when adding an event to the EventData collection.
      Session.set('eventModal', { type: 'add', date: date.format() });
      // If the date has not already passed, show the create event modal.

      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go(FlowRouter.path('Manage_Page', FlowRouter.current().params));
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
