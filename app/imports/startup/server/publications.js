import { Interests } from '/imports/api/interest/InterestCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Categories } from '/imports/api/categories/CategoryCollection';
import { Games } from '/imports/api/template/template.js';
import { Listings } from '/imports/api/listings/ListCollection';
import { GameTemplate } from '../../api/template/template.js';


Interests.publish();
Profiles.publish();
Categories.publish();
Games.publish();
Listings.publish();

Meteor.publish('GameTemplate', function publishContactsData() {
  return GameTemplate.find();
});