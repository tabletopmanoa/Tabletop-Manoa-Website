import { Template } from 'meteor/templating';
import {GameTemplate,  Games} from '../../../api/games/GameCollection.js'
import {ReactiveDict } from 'meteor/reactive-dict';

const era = 10;
Template.Games_Page.onCreated(
  function bodyOnCreated(){
    this.state=new ReactiveDict();
    this.context = Games.getSchema().namedContext('Games_Page');


  }
);

Template.Games_Page.helpers({
  gamesList(){
   const instance=Template.instance();
   return Games.collection().find();
    /*
    if(instance.state.get('category').equals('all')){
      console.log("works here");
      return Games.collection().find();
    }
    else{
      return Games.collection().find({},{fields:{category:instance.state.get('category')}});
    }
    */
  },

  message(){
    const instance = Template.instance();
    return instance.state.get('category');
  }

});


Template.Games_Page.events({
  'change #magic-checkbox'(event, instance){
    /*TODO: Remove test code to see **/
    console.log("magic");
    instance.state.set('magic-checked',event.target.checked);
    this.era++;
    const categoryName = 'roleplaying'
    const gameName = 'Pathfinder';
    const category = [categoryName];
    const maxPlayers = Math.floor((Math.random()*100%10));
    const date = new Date("April 29, 2017 11:13:00");
    const gameLength = '4 hours';
    const location = 'Hale Wina Lounge';
    const about = 'This game is very cool';
    const picture = 'http://www.levelupgamesmn.com/uploads/2/4/7/7/24777638/2796519_orig.png';
    const contact = 'kodayv@hawaii.edu';
    const resources = 'http://www.d20pfsrd.com/';
    const defineObject = { gameName, category, maxPlayers, date, gameLength, location, about, picture, contact, resources };
    instance.context.resetValidation();
    Games.define(defineObject);
    console.log("cleaned");
    console.log(defineObject);
    if(instance.context.validate((defineObject))){

      const id=Games.collection().insert(defineObject);
      console.log("Games:"+Games.findAll());
      console.log("Collection:"+Games.collection().find());
    }
    else{
      console.log("not valid\n");
    }

  },
  'change #mini-games'(event,instance){
    instance.state.set('mini-games',event.target.checked);
    instance.state.set('category','mini');
  },
  'change #card-games'(event,instance){
    instance.state.set('card-games',event.target.checked);
    instance.state.set('category','card');
  },
  'change #rp-games'(event,instance){
    instance.state.set('rp-games',event.target.checked);
    instance.state.set('category','role');
  },
  'change #all-games'(event,instance){
    instance.state.set('all-games',event.target.checked);
    instance.state.set('category','all');
  },
  'change #board-games'(event,instance){
    instance.state.set('board-games',event.target.checked);
    instance.state.set('category','board');
    console.log(event.target.checked);
  },

});
