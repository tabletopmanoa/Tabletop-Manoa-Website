import { Tracker } from 'meteor/tracker';
import { GamesTemplate, Games, GameCollection } from '../../../api/games/GameCollection.js';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';

Template.Calendar_Page.onCreated(() => {
  Template.instance().subscribe('Games');
  Games.getSchema().namedContext('Games_Page');
  Games.getPublicationName();
  Games.publish();
});
function listGames() {
  var gameList = Games.collection().find({ category: 'all' });
  var objects = gameList.collection._docs;
  var list = _.where(objects._map, {category: 'Role Playing'})

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
    events: list



    // // Triggered when a day is clicked on.
    // dayClick(date, session) {
    //   // Store the date so it can be used when adding an event to the EventData collection.
    //   Session.set('eventModal', { type: 'add', date: date.format() });
    //   // If the date has not already passed, show the create event modal.
    //   if(moment(date.format()).isSameOrAfter(moment(), 'day')) {
    //     $('#create-event-modal').modal({ blurring: true }).modal('show');
    //   }
    // },
    //
    // // Delete an event if it is clicked on.
    // eventClick(event) {
    //   EventData.remove({ _id: event._id });
    // },
    //
    // // Allow events to be dragged and dropped.
    // eventDrop(session, delta, revert) {
    //   let date = session.start.format();
    //
    //   if (!isPast(date)) {
    //     let update = {
    //       _id: session._id,
    //       start: date,
    //       end: date
    //     };
    //
    //     // Update the date of the event.
    //     Meteor.call('editEvent', update);
    //   } else {
    //     revert();
    //   }
    // },
  });

  // Updates the calendar if there are changes.
  Tracker.autorun(() => {
    Games.find().fetch();
    $('#event-calendar').fullCalendar('refetchEvents');
  });
});
