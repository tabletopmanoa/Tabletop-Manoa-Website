import { Template } from 'meteor/templating';
import { Games } from '../../../api/games/GameCollection.js';
import { ReactiveDict } from 'meteor/reactive-dict';

Template.Games_Page.onCreated(
    function bodyOnCreated() {
      this.state = new ReactiveDict();
      this.context = Games.getSchema().namedContext('Games_Page');

      this.subscribe(Games.getPublicationName());
    }
);

Template.Games_Page.helpers({
  gamesList() {
    const instance = Template.instance();
    let state = instance.state.get('category');
    if (state === undefined) {
      state = 'all';
    }
    if (state === 'all') {
      return Games.collection().find();
    }
    return Games.collection().find({ category: state }, {});
  },
  message() {
    return '';
  },
});

Template.Games_Page.events({
  'change #magic-checkbox'(event, instance) {
    /*
     TODO: Remove test code to see */
    instance.state.set('magic-checked', event.target.checked);
    this.era++;
    const categoryName = 'roleplaying';
    const gameName = 'Pathfinder';
    const category = categoryName;
    const maxPlayers = Math.floor((Math.random() * 100 % 10));
    const meetingDate = new Date('April 29, 2017 07:00:00');
    const startTime = '20:00';
    const endTime = '23:00';
    const location = 'Hale Wina Lounge';
    const about = 'This game is very cool';
    const picture = 'http://www.levelupgamesmn.com/uploads/2/4/7/7/24777638/2796519_orig.png';
    const contact = 'kodayv@hawaii.edu';
    const resources = 'http://www.d20pfsrd.com/';
    // const imageURL = 'url.com';
    const userID = 'x';
    const defineObject = {
      gameName,
      category,
      maxPlayers,
      meetingDate,
      startTime,
      endTime,
      // gameLength,
      location,
      about,
      picture,
      contact,
      resources,
      userID,
      // imageURL,
    };
    Games.define(defineObject);
    Games.publish();
  },
  'change #mini-games'(event, instance) {
    instance.state.set('mini-games', event.target.checked);
    instance.state.set('category', 'mini');
  },
  'change #card-games'(event, instance) {
    instance.state.set('card-games', event.target.checked);
    instance.state.set('category', 'card');
  },
  'change #rp-games'(event, instance) {
    instance.state.set('rp-games', event.target.checked);
    instance.state.set('category', 'roleplaying');
  },
  'change #all-games'(event, instance) {
    instance.state.set('all-games', event.target.checked);
    instance.state.set('category', 'all');
  },
  'change #board-games'(event, instance) {
    instance.state.set('board-games', event.target.checked);
    instance.state.set('category', 'board');
  },

});
