import { UserToGames } from './UserToGamesCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('UserToGamesCollection', function testSuite() {
    const ID = 'XFDe4rgteed';
    const userID = 'XDgrEfcdS';
    const defineObject = {ID: ID , UserID: userID };

    before(function setup() {
      removeAllEntities();
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne,', function test() {
      let docID = UserToGames.define(defineObject);
      expect(UserToGames.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = UserToGames.findDoc(docID);
      expect(doc.ID).to.equal(ID);
      expect(doc.UserID).to.equal(userID);
      // Check that we can dump and restore a Interest.

      const dumpObject = UserToGames.dumpOne(docID);
      UserToGames.removeIt(docID);
      expect(UserToGames.isDefined(docID)).to.be.false;

    });

  });
}

