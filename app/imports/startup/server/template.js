/**
 * Created by koday on 3/5/2017.
 */
import { Contacts } from '../../api/template/template.js';
import { _ } from 'meteor/underscore';

/**
 * A list of contacts to pre-fill the Collection.
 * @type {*[]}
 */
const contactSeeds = [
  {
    first: 'Virginia',
    last: 'Koday',
    address: '1032 Varsity Cir',
    telephone: '828-548-2548',
    email: 'kodayv@hawaii.edu'
  },
  { first: 'Thomas', last: 'Hall', address: '1032 Varsity Cir', telephone: '828-226-5471', email: 'thall@hawaii.edu' },
  { first: 'Tatjana', last: 'Hall', address: '1032 Varsity Cir', telephone: '828-548-2548', email: 'hallt@hawaii.edu' },
  {
    first: 'Joseph',
    last: 'Wallen',
    address: '1032 Varsity Cir',
    telephone: '828-548-2548',
    email: 'jwallen@hawaii.edu'
  },
  { first: 'Valerie', last: 'Koday', address: '1027 S Ohio st', telephone: '956-765-3552', email: 'vkoday@hawaii.edu' },

];

/**
 * Initialize the contacts collection if empty with seed data.
 */
if (Contacts.find().count() === 0) {
  _.each(contactSeeds, function seedcontactss(contacts) {
    Contacts.insert(contacts);
  });
}
