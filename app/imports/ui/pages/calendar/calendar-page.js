import { Games } from '../../../api/games/GameCollection.js';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';

Template.Calendar_Page.onCreated(
    function bodyOnCreated() {
      this.context = Games.getSchema().namedContext('Calendar_Page');
      this.subscribe(Games.getPublicationName());
    }
);
function listGames() {
  const gameList = Games.collection().find({ category: 'all' });
  const objects = gameList.collection._docs;
  const list = _.toArray(objects._map);
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
      right: 'today prev,next,basicWeek,month',
    },
    events: list,
    eventClick(calEvent) {
      alert(`Event: ${calEvent.title}, Start Time: ${calEvent.startTime}, Location : ${calEvent.location}`);
      // change the border color just for fun
      $(this).css('border-color', 'red');
    },
  });
});
