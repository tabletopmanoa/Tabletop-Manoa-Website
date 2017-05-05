import { Template } from 'meteor/templating';
// import { Listings } from '../../../api/listings/listings';
import { GameTemplate } from '../../../api/games/GameCollection';


Template.Browse_Page.helpers({

  /**
   * @returns {*} All of the listings documents.
   */
  GamesList() {
    return GameTemplate.find();
  },
});

// Template.Browse_Page.onCreated(function onCreated() {
//   this.subscribe('Listings');
// });

Template.Browse_Page.onCreated(function onCreated() {
  this.subscribe('GameTemplate');
});
