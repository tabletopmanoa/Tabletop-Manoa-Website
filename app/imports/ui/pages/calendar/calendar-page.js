/**
 * Created by koday on 4/1/2017.
 */
import './calendar-page.html';
import './calendar-page.css';
import './calendar-page.js';
// import './fullcalendar-3.3.1/fullcalendar.js';
// import './fullcalendar-3.3.1/fullcalendar.css';
// import './fullcalendar-3.3.1/fullcalendar.min';
// import './fullcalendar-3.3.1/fullcalendar.print.css';
// import './fullcalendar-3.3.1/fullcalendar.print.min.css';
// import './fullcalendar-3.3.1/gcal.js';
// import './fullcalendar-3.3.1/gcal.min';

Template.Calendar_Page.helpers({
  options: function () {
    return {
      defaultView: 'month',
      header: {
        left: 'month, list',
        center: 'title',
        right: 'today, prev, next'
      },

      googleCalendarApiKey: 'AIzaSyCVXk0-jAAHD8HcmooZR0U3nDd3kJ3qqRY',

      //     events: {
      //       googleCalendarId: 'hawaii.edu_je2p1nmo99jntmelkgsh8m5vjo@group.calendar.google.com'
      //
      // },

      events: [
        {
          title: 'Exploding Kittens',
          start: '2017-04-01T12:30:00',
          allDay: false // will make the time show
        },
        {
          title: 'Risk Legacy Marathon',
          start: '2017-04-05T17:30:00',
          end: '2017-04-07'
        },
        {
          title: 'Pathfinder',
          start: '2017-04-09T19:30:00',
          allDay: false // will make the time show
        }
      ],

      eventClick: function (event) {
        window.open(event.url, 'gcalevent', 'width=300, height=300');
        return false;
      },
      eventMouseover: function (event, jsEvent, view) {

      },

      loading: function (bool) {
        $('#loading').toggle(bool);
      }

    }
        ;
  },
});

function viewList() {
  return changeView(listWeek);
}

function listEvents(auth) {
  var calendar = google.calendar('v3');
  calendar.events.list({
    auth: auth,
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  }, function (err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var events = response.items;
    if (events.length == 0) {
      console.log('No upcoming events found.');
    } else {
      console.log('Upcoming 10 events:');
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var start = event.start.dateTime || event.start.date;
        console.log('%s - %s', start, event.summary);
      }
    }
  });
}