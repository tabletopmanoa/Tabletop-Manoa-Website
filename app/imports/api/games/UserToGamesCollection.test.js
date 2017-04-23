import { UserToGames } from './UserToGamesCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('UserToGamesCollection', function testSuite() {
    const ID = new Meteor.Collection.ObjectID;
    const userID = 'kodayv@hawaii.edu';
    const defineObject = {ID: ID , UserID: userID };

    before(function setup() {
      removeAllEntities();
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
      let docID = UserToGames.define(defineObject);
      expect(UserToGames.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = UserToGames.findDoc(docID);
      expect(doc.ID).to.equal(ID);
      expect(doc.userID).to.equal(userID);
      // Check that multiple definitions with the same ID fail
      expect(function foo() { UserToGames.define(defineObject); }).to.throw(Error);
      // Check that we can dump and restore a Interest.
      const dumpObject = UserToGames.dumpOne(docID);
      UserToGames.removeIt(docID);
      expect(UserToGames.isDefined(docID)).to.be.false;
      docID = UserToGames.restoreOne(dumpObject);
      expect(UserToGames.isDefined(docID)).to.be.true;
      UserToGames.removeIt(docID);
    });

    it('#findID, #findIDs', function test() {
      const docID = UserToGames.define(defineObject);
      expect(UserToGames.isDefined(docID)).to.be.true;
      const docID2 = UserToGames.findID(ID);
      expect(docID).to.equal(docID2);
      UserToGames.findIDs([ID, ID]);
      UserToGames.removeIt(docID);
    });
  });
}

