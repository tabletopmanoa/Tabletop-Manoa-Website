import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { GameTemplate, GameSchema } from '../../../api/template/template.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';

// import { username } from '/app/imports/startup/client/useraccount-configuration.js';


/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';


Template.AddGame_Page.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = GameSchema.namedContext('Add_Contact_Page');
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