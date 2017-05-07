import { Tracker } from 'meteor/tracker';
import { EventData } from '../../../api/eventdata/eventdata';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Games } from '/imports/api/games/GameCollection';
import { ReactiveDict } from 'meteor/reactive-dict';


Template.Calendar_Page.onCreated(
    function bodyOnCreated() {
      this.state = new ReactiveDict();
      this.context = Games.getSchema().namedContext('Calendar_Page');
      this.subscribe(Games.getPublicationName());
    }
);
// Template.Calendar_Page.helpers({
//   gamesList() {
//     const instance = Template.instance();
//     let state = instance.state.get('category');
//     if (state === undefined) {
//       state = 'all';
//     }
//     if (state == 'all') {
//       return Games.collection().find();
//     }
//     return Games.collection().find({ category: state }, {});
//   },
//   message() {
//     return '';
//   },
// });
// Games.publish();

Template.Calendar_Page.onRendered(() => {
  // console.log(Games.find().fetch());
  // Initialize the calendar.
  $('#event-calendar').fullCalendar({
    // Define the navigation buttons.
    header: {
      left: 'title',
      center: '',
      right: 'today prev,next',
    },
    eventSources: Games.collection().find(),
    // events: [
    //   {
    //     title: 'event1',
    //     start: '2017-05-01'
    //   },
    //   {
    //     title: 'event2',
    //     start: '2017-05-20',
    //     end: '2010-01-07'
    //   },
    //   {
    //     title: 'event3',
    //     start: '2017-05-09T12:30:00',
    //     allDay: false, // will make the time show
    //   },
    // ],

    // Configure the information displayed for an "event."
    // eventRender(session, element) {
    //   element.find('.fc-content').html(
    //       `<h4 class="title">${session.title}</h4>
    //       <p class="time">${session.startString}</p>
    //       `
    //   );
    // },

    // Updates the calendar if there are changes.
    // Tracker: autorun(() => {
    //   EventData.find().fetch();
    //   $('#event-calendar').fullCalendar('refetchEvents');
    // }),
  });
});
