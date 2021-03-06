import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { $ } from 'meteor/jquery';

/*                        LANDING ROUTE                       */

export const landingPageRouteName = 'Landing_Page';
FlowRouter.route('/', {
  name: landingPageRouteName,
  action() {
    BlazeLayout.render('Landing_Layout', { main: landingPageRouteName });
  },
});

/*                        DIRECTORY ROUTE                       */

function addDirectoryBodyClass() {
  $('body').addClass('directory-page-body');
}

function removeDirectoryBodyClass() {
  $('body').removeClass('directory-page-body');
}

export const directoryPageRouteName = 'Directory_Page';
FlowRouter.route('/directory', {
  name: directoryPageRouteName,
  action() {
    BlazeLayout.render('Directory_Layout', { main: directoryPageRouteName });
  },
  triggersEnter: [addDirectoryBodyClass],
  triggersExit: [removeDirectoryBodyClass],
});

/*                        USER ROUTES                      */

function addUserBodyClass() {
  $('body').addClass('user-layout-body');
}

function removeUserBodyClass() {
  $('body').removeClass('user-layout-body');
}

const userRoutes = FlowRouter.group({
  prefix: '/:username',
  name: 'userRoutes',
  triggersEnter: [addUserBodyClass],
  triggersExit: [removeUserBodyClass],
});

export const templatePageRouteName = 'Template_Page';
userRoutes.route('/template', {
  name: templatePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: templatePageRouteName });
  },
});

export const addGamePageRouteName = 'AddGame_Page';
userRoutes.route('/addGame', {
  name: addGamePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: addGamePageRouteName });
  },
});

export const gamesPageRouteName = 'Games_Page';
userRoutes.route('/games', {
  name: gamesPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: gamesPageRouteName });
  },
});

export const welcomePageRouteName = 'Welcome_Page';
userRoutes.route('/welcome', {
  name: welcomePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: welcomePageRouteName });
  },
});

export const managePageRouteName = 'Manage_Page';
userRoutes.route('/manage', {
  name: managePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: managePageRouteName });
  },
});
export const infoPageRouteName = 'Info_Page';
userRoutes.route('/info/:_id', {
  name: infoPageRouteName,
  data() {
    return { _id: this.params._id };
  },
  action() {
    BlazeLayout.render('User_Layout', { main: infoPageRouteName });
  },
});
export const newgamePageRouteName = 'NewGame_Page';
userRoutes.route('/newGame', {
  name: newgamePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: newgamePageRouteName });
  },
});

export const browsePageRouteName = 'Browse_Page';
userRoutes.route('/browse', {
  name: browsePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: browsePageRouteName });
  },
});

export const calendarPageRouteName = 'Calendar_Page';
userRoutes.route('/calendar', {
  name: calendarPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: calendarPageRouteName });
  },
});

export const profilePageRouteName = 'Profile_Page';
userRoutes.route('/profile', {
  name: profilePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: profilePageRouteName });
  },
});

export const filterPageRouteName = 'Filter_Page';
userRoutes.route('/filter', {
  name: filterPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: filterPageRouteName });
  },
});

/*                        MISC ROUTES                       */
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('Page_Not_Found');
  },
};
