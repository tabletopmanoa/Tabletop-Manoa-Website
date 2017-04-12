import { Template } from 'meteor/templating';
import {GameTemplate} from '../../../api/template/template.js'
import {ReactiveDict } from 'meteor/reactive-dict';

Template.Games_Page.onCreated(
  function bodyOnCreated(){
    this.state=new ReactiveDict();
  }
);

Template.Games_Page.helpers({
  gamesList(){
    return GameTemplate.find();
  },
  message(){
    const instance = Template.instance();
    if(instance.state.get('magic-checked')){
      return "true";
    }else{
      return "false";
    }
  }
});


Template.Games_Page.events({
  'change magic-checkbox'(event, instance){

    instance.state.set('magic-checked',event.target.checked);
  }


});
