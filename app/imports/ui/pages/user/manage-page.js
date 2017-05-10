import { Template } from 'meteor/templating';
import { Games } from '../../../api/games/GameCollection.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import { UserToGames } from '../../../api/games/UserToGamesCollection.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.Manage_Page.onCreated(
    function bodyOnCreated() {
      this.state = new ReactiveDict();
      this.context = Games.getSchema().namedContext('Manage_Page');

      this.subscribe(Games.getPublicationName());
      this.subscribe(UserToGames.getPublicationName());
    }
);

Template.Manage_Page.helpers({
  routeUserName() {
    return FlowRouter.getParam('username');
  },
  runningList(){
      console.log(Games.find().fetch());
    const userID = FlowRouter.getParam('username');
    return Games.find({ userID }).fetch();
  },
  playingList() {
    const UserID = FlowRouter.getParam('username');
    const allMyGames = UserToGames.find({ UserID }).fetch();
    let gameList = [];
    for (let i = 0; i < allMyGames.length; i++) {
      gameList = gameList.concat(Games.find({ _id: allMyGames[i].ID }).fetch());
    }
    return gameList;
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

Template.Manage_Page.events({
  'click .joinGame'(event) {
    const ID = event.target.value;
    const UserID = FlowRouter.getParam('username');
    const defineObject = { ID, UserID };
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
  'click .leaveGame'(event) {
    const ID = event.target.value;
    const UserID = FlowRouter.getParam('username');
    console.log(UserToGames.find({ ID, UserID }).fetch());
    const list = UserToGames.find({ ID, UserID }).fetch();
    for (let i = 0; i < list.length; i++) {
      UserToGames.collection().remove(list[i]._id);
      UserToGames.publish();
    }
    return false;
  },

});
