import { Tracker } from 'meteor/tracker';
import { Games } from '../../../api/games/GameCollection.js';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';

Template.Calendar_Page.onCreated(
    function bodyOnCreated() {
      this.context = Games.getSchema().namedContext('Calendar_Page');
      this.subscribe(Games.getPublicationName());
    }
);
function listGames() {
  var gameList = Games.collection().find({ category: 'all' });
  var objects = gameList.collection._docs;
  var list = _.toArray(objects._map);
  console.log('calendar');
  console.log(list);
  return list;
}
Template.Calendar_Page.onRendered(() => {
  const list = listGames();
  // Initialize the calendar.
  $('#event-calendar').fullCalendar({
    // Define the navigation buttons.    // Define the navigation buttos.
    header: {
      left: 'title',
      center: '',
      right: 'today prev,next',
    },
    events: list,
    eventClick: function (event) {
      FlowRouter.go(FlowRouter.path('Manage_Page', FlowRouter.current().params));
    }
  });
});
