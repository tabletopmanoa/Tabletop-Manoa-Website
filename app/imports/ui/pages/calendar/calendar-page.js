import { Tracker } from 'meteor/tracker';
import { GameTemplate } from '../../../api/games/GameCollection.js';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
// import { moment } from './src/moment.js';
import { Meteor } from 'meteor/meteor';

// Define a function that checks whether a moment has already passed.
const isPast = (date) => {
  const moment = date();
  return moment.isAfter(date);
};

Template.Calendar_Page.onCreated(() => {
  Template.instance().subscribe('GameTemplate');
});

Template.Calendar_Page.onRendered(() => {
  // Initialize the calendar.
  ('#event-calendar').fullCalendar({
    // Define the navigation buttons.
    header: {
      left: 'title',
      center: '',
      right: 'today prev,next',
    },
    // Add events to the calendar.
    // events(start, end, timezone, callback) {
    //   const data = GameTemplate.find().fetch().map((session) => {
    //     // Don't allow already past study events to be editable.
    //     session.editable = !isPast(session.start);
    //     return session;
    //   });
    //
    //   if (data) {
    //     callback(data);
    //   }
    // },

    // Configure the information displayed for an "event."
    eventRender(session, element) {
      element.find('.fc-content').html(
          `<h4 class="title">${session.title}</h4>
          <p class="time">${session.startString}</p>
          `
      );
    },

    // Triggered when a day is clicked on which is not in the past. locate to addgame with date saved
    dayClick(date, session) {
      if (!isPast(date)) {
        // Store the date so it can be used when adding an event to the GameTemplate collection.
        Session.set('eventModal', { type: 'add', date: date.format() });
        // If the date has not already passed, show the create event modal.
        if (moment(date.format()).isSameOrAfter(moment(), 'day')) {
          ('#create-event-modal').modal({ blurring: true }).modal('show');
        }
      }
    },

    // show game information if it is clicked on.
    eventClick(event) {
      // GameTemplate.remove({ _id: event._id });
    },

  });

  // Updates the calendar if there are changes.
  Tracker.autorun(() => {
    GameTemplate.find().fetch();
    ('#event-calendar').fullCalendar('refetchEvents');
  });
});
