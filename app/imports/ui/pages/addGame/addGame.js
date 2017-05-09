import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Games } from '/imports/api/games/GameCollection';
import { EventData, EventDataSchema } from '../../../api/eventdata/eventdata.js';

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

    let category = '_';
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
    let title = ' ';
    if (rpgGameId.options[rpgGameId.selectedIndex].value === '7') {
      title = event.target.enterRPG.value;
      if (!title) {
        title = 'Role Playing Game';
      }
    } else
      if (rpgGameId.options[rpgGameId.selectedIndex].value > 0) {
        title = rpgGameId.options[rpgGameId.selectedIndex].text;
      } else
        if (cardGameId.options[cardGameId.selectedIndex].value === '10') {
          title = event.target.enterCard.value;
          if (!title) {
            title = 'Card Game';
          }
        } else
          if (cardGameId.options[cardGameId.selectedIndex].value > 0) {
            title = cardGameId.options[cardGameId.selectedIndex].text;
          } else
            if (boardGameId.options[boardGameId.selectedIndex].value === '7') {
              title = event.target.enterBoard.value;
              if (!title) {
                title = 'Board Game';
              }
            } else
              if (boardGameId.options[boardGameId.selectedIndex].value > 0) {
                title = boardGameId.options[boardGameId.selectedIndex].text;
              } else
                if (miniGameId.options[miniGameId.selectedIndex].value === '5') {
                  title = event.target.enterMini.value;
                  if (!title) {
                    title = 'Miniatures';
                  }
                } else
                  if (miniGameId.options[miniGameId.selectedIndex].value > 0) {
                    title = miniGameId.options[miniGameId.selectedIndex].text;
                  } else {
                    title = 'Error';
                  }

    const maxPlayers = parseInt(document.getElementById('Players').value, 10);
    const location = event.target.Location.value;
    const smoking = document.getElementById('Smoking').checked;
    const alcohol = document.getElementById('Alcohol').checked;
    const date = event.target.date.value;
    const startTime = event.target.start.value;
    const endTime = event.target.end.value;
    const recurring = document.getElementById('Recurring').checked;
    const contact = event.target.contact.value;
    const resources = event.target.resources.value;
    const picture = event.target.imageURL.value;
    const about = event.target.about.value;
    const cancelled = false;
    const start = date + ' ' + startTime;

    const defineObject = {
      title,
      category,
      maxPlayers,
      date,
      startTime,
      endTime,
      location,
      about,
      smoking,
      alcohol,
      recurring,
      contact,
      resources,
      picture,
      userID,
      cancelled,
      start,
    };

    if (instance.context.isValid()) {
      console.log('should be valid');

      Games.define(defineObject);
      Games.publish();
      instance.messageFlags.set(displayErrorMessages, false);
      window.alert('Your game group has been successfully added.');  // eslint-disable-line no-alert
      FlowRouter.go(FlowRouter.path('Manage_Page', FlowRouter.current().params));
    } else {

      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
})
;
