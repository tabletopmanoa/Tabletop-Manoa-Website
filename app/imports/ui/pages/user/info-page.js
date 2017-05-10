import { Template } from 'meteor/templating';
import { Games } from '../../../api/games/GameCollection.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import { UserToGames } from '../../../api/games/UserToGamesCollection.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';


Template.Info_Page.onCreated(
    function bodyOnCreated() {
      this.state = new ReactiveDict();
      this.context = Games.getSchema().namedContext('Info_Page');
      this.subscribe(Games.getPublicationName());
      this.subscribe(UserToGames.getPublicationName());
    }
);

Template.Info_Page.helpers({

  gamesList() {
    const state = location.pathname.split('/')[3];
    const gameList = Games.collection().find({ category: 'all' });
    const objects = gameList.collection._docs._map;
    const game = _.where(objects, { _id: state });
    return game;
  },
  message() {
    return '';
  },
  isOpen(tID) {
    const howMany = UserToGames.find({ ID: tID }).fetch().length;
    if (howMany > Games.findDoc(tID).maxPlayers) {
      return false;
    }
    return true;
  },
  alreadyPlaying(ID) {
    const UserID = FlowRouter.getParam('username');
    if (UserToGames.find({ ID, UserID }).fetch().length > 0) {
      return true;
    }
    return false;
  },
});

Template.Info_Page.events({
  'click .joinGame'(event) {
    const ID = event.target.value;
    const UserID = FlowRouter.getParam('username');
    if (UserToGames.find({ ID, UserID }).fetch().length > 0) {
      /**
       * This will trigger if there is a document that already exists for this user and game.
       */
    } else {
      UserToGames.publish();
    }
    return false;
  },
  'click .leaveGame'(event) {
    const ID = event.target.value;
    const UserID = FlowRouter.getParam('username');
    const list = UserToGames.find({ ID, UserID }).fetch();
    for (let i = 0; i < list.length; i++) {
      UserToGames.collection().remove(list[i]._id);
      UserToGames.publish();
    }
    return false;
  },
});
