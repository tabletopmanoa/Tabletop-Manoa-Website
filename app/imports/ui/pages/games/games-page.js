import { Template } from 'meteor/templating';
import {GameTemplate} from '../../../api/games/GameCollection.js'
import {ReactiveDict } from 'meteor/reactive-dict';


Template.Games_Page.onCreated(
  function bodyOnCreated(){
    this.state=new ReactiveDict();
  }
);

Template.Games_Page.helpers({
  gamesList(){
   const instance=Template.instance();

    if(instance.state.get('category').equals('all')){
      console.log("works here");
      return GameTemplate.find();
    }
    else{
      return GameTemplate.find({},{fields:{category:instance.state.get('category')}});
    }
  },

  message(){
    const instance = Template.instance();
    return instance.state.get('category');
  }
});


Template.Games_Page.events({
  'change #magic-checkbox'(event, instance){
    console.log("magic");
    instance.state.set('magic-checked',event.target.checked);
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
