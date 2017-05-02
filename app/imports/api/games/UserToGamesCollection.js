import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
// import { Categories } from '/imports/api/categories/CategoryCollection';
import { check } from 'meteor/check';
// import { Meteor } from 'meteor/meteor';
import BaseCollection from '/imports/api/base/BaseCollection';
import { _ } from 'meteor/underscore';

export const GameUserCollection = new Mongo.Collection('GameUserCollection');

class GameUserSchema extends BaseCollection {

  /**
   * Create the schema for contacts
   */
  constructor() {
    super('UserToGames', new SimpleSchema({
      ID: {
        label: 'ID',
        type: String,
        optional: false,
        max: 20,
      },
      UserID: {
        label: 'UserID',
        type: String,
        optional: false,
        max: 20,
      },
    }));
  }

  define({ ID, UserID }) {
    check(ID, String);
    check(UserID, String);
    // Throw an error if any of the passed Categories names are not defined.
    return this._collection.insert({
      ID,
      UserID,
    });
  }

  /**
   * Returns a list of Game names corresponding to the User ID.
   * @param UserIDs A list of Interest docIDs.
   * @returns { Array }
   * @throws { Meteor.Error} If any of the instanceIDs cannot be found.
   */
  findGames(User) {
    return _.where(GameUserSchema, { UserID: User });
  }

  findID(id) {
    return _.where(GameUserSchema, { ID: id });
  }

  /**
   * Returns an object representing the Profile docID in a format acceptable to define().
   * @param docID The docID of a Profile.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const id = doc.ID;
    const userid = doc.UserID;
    return { id, userid };
  }
}

export const UserToGames = new GameUserSchema();
GameUserCollection.attachSchema(GameUserSchema);
