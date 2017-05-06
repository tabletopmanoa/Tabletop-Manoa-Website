import { Tracker } from 'meteor/tracker';
import { GameTemplate } from '../../../api/template/template.js';
import { Template } from 'meteor/templating';

// Define a function that checks whether a moment has already passed.
const isPast = (date) => {
  const today = new Date();
  return today.isAfter(date);
};

Template.Calendar_Page.onCreated(function onCreated() {
  this.subscribe('GameTemplate');
});


Template.Calendar_Page.onRendered(() => {
  // Initialize the calendar.

  $('#event-calendar').fullCalendar({
    // Define the navigation buttons.
    header: {
      left: 'title',
      center: '',
      right: 'today prev,next',
    },
    // Add events to the calendar.
    events(date, gameLength, callback) {
      const data = GameTemplate.find().fetch().map((session) => {
        // Don't allow already past study events to be editable.
        // session.editable = !isPast(session.date);
        return session;
      });

      if (data) {
        callback(data);
      }
    },

    // Configure the information displayed for an "event."
    eventRender(session, element) {
      element.find('.fc-content').html(
          `<h4 class="name">${session.gameName}</h4>
          <p class="time">${session.date}</p>
          `
      );
    }
    ,

// // Triggered when a day is clicked on.
//     dayClick (date, session)
//     {
//       // Store the date so it can be used when adding an event to the GameTemplate collection.
//       Session.set('eventModal', { type: 'add', date: date.format() });
//       // If the date has not already passed, show the create event modal.
//       if (moment(date.format()).isSameOrAfter(moment(), 'day')) {
//         $('#create-event-modal').modal({ blurring: true }).modal('show');
//       }
//     }
//     ,

// // Delete an event if it is clicked on.
//     eventClick(event)
//     {
//       GameTemplate.remove({ _id: event._id });
//     }
//     ,
//
// // Allow events to be dragged and dropped.
//     eventDrop(session, delta, revert)
//     {
//       let date = session.start.format();
//
//       if (!isPast(date)) {
//         let update = {
//           _id: session._id,
//           start: date,
//           end: date,
//         };
//
//         // Update the date of the event.
//         Meteor.call('editEvent', update);
//       } else {
//         revert();
//       }
//     }
//     ,
  })
  ;

// Updates the calendar if there are changes.
//   Tracker.autorun(() => {
//     GameTemplate.find().fetch();
//     $('#event-calendar').fullCalendar('refetchEvents');
//   });
})
;
