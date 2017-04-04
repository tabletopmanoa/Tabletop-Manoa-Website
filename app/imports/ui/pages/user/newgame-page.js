import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Games } from '/imports/api/games/GameCollection';
import { Categories } from '/imports/api/categories/CategoryCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

export const categoryList = ['Role Playing Games', 'Card Games', 'Board Games', 'Miniatures'];

Template.NewGame_Page.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
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
});

Template.NewGame_Page.events({
  'submit .game-data-form'(event, instance) {
    event.preventDefault();
    const username = FlowRouter.getParam('username'); // schema requires username.

    if (instance.context.isValid()) {
      const docID = Games.findDoc(FlowRouter.getParam('username'))._id;
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
