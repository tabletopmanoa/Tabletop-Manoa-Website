import { Template } from 'meteor/templating';
import { GameTemplate } from '../../../api/template/template.js';
console.log(GameTemplate.find());
Template.Template_Page.helpers({

  /**
   * @returns {*} All of the contacts documents.
   */
  contactsList() {
    return GameTemplate.find();
  },
});

Template.Template_Page.onCreated(function onCreated() {
  this.subscribe('GameTemplate');
});
