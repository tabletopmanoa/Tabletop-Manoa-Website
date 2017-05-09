import { Template } from 'meteor/templating';
import { Games } from '../../../api/games/GameCollection.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import { UserToGames } from '../../../api/games/UserToGamesCollection.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

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
    const instance = Template.instance();
    let state = location.pathname.split('/')[3];
    const gameList = Games.collection().find({ category: 'all'});
    const objects = gameList.collection._docs._map;
    const game = _.where(objects, {  _id: state});
    console.log(game);
    return game;
  },
  message() {
    return '';
  },
});

Template.Info_Page.events({
  'click .joinGame'(event) {
    const ID = event.target.value;
    const UserID = FlowRouter.getParam('username');
    const defineObject = { ID, UserID };
    console.log(UserToGames.find({ ID, UserID }).fetch());
    if (UserToGames.find({ ID, UserID }).fetch().length > 0) {
      /**
       * This will trigger if there is a document that already exists for this user and game.
       */
    } else {
      console.log(defineObject);
      console.log(UserToGames.define(defineObject));
      UserToGames.publish();
    }
    return false;
  },
});
