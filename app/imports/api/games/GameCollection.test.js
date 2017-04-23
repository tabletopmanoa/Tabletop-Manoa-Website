/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

import { Games } from './GameCollection.js';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';
import  { UserToGames } from  './UserToGamesCollection';


if (Meteor.isServer) {
  describe('GameCollection', function testSuite() {
    const ID = new Meteor.Collection.ObjectID;
    const categoryName = 'roleplaying'
    const gameName = 'Pathfinder';
    const category = [categoryName];
    const maxPlayers = 10;
    const date = new Date("April 29, 2017 11:13:00");
    const gameLength = '4 hours';
    const location = 'Hale Wina Lounge';
    const smoking = true;
    const alcohol = false;
    const recurring = true;
    const about = 'This game is very cool';
    const picture = 'http://www.levelupgamesmn.com/uploads/2/4/7/7/24777638/2796519_orig.png';
    const contact = 'kodayv@hawaii.edu';
    const resources = 'http://www.d20pfsrd.com/';
    const userName = 'kodayv@hawaii.edu';
    const userID = [userName];
    const defineObject = { gameName, category, maxPlayers, date, gameLength, location, smoking, alcohol, recurring, about, picture, contact, resources, userID, ID };

    before(function setup() {
      removeAllEntities();
      UserToGames.define( {ID: ID , UserID: userName });
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
      let docID = Games.define(defineObject);
      expect(Games.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = Games.findDoc(docID);
      expect(doc.gameName).to.equal(gameName);
      expect(doc.maxPlayers).to.equal(maxPlayers);
      expect(doc.gameLength).to.equal(gameLength);
      expect(doc.location).to.equal(location);
      expect(doc.smoking).to.equal(smoking);
      expect(doc.alcohol).to.equal(alcohol);
      expect(doc.recurring).to.equal(recurring);
      expect(doc.date.getTime()).to.equal(date.getTime());
      expect(doc.category[0]).to.equal(categoryName);
      expect(doc.about).to.equal(about);
      expect(doc.picture).to.equal(picture);
      expect(doc.contact).to.equal(contact);
      expect(doc.resources).to.equal(resources);

      // Check that we can dump and restore a Profile.
      const dumpObject = Games.dumpOne(docID);
      Games.removeIt(docID);
      expect(Games.isDefined(docID)).to.be.false;
      docID = Games.restoreOne(dumpObject);
      expect(Games.isDefined(docID)).to.be.true;
      Games.removeIt(docID);
    });

    it('#define (illegal item)', function test() {
      const illegalItem = ['foo'];
      const ID1 = new Meteor.Collection.ObjectID();
      const defineObject2 = {gameName, category, illegalItem, maxPlayers, date, gameLength, location, smoking, alcohol, recurring, about, picture, contact, resources, userID, ID1};
      expect(function foo() { GameCollection.define(defineObject2); }).to.throw(Error);
    });

    it('#define (missing required item)', function test() {
      const ID2 = new Meteor.Collection.ObjectID();
      const defineObject2 = {gameName, maxPlayers, date, gameLength, location, smoking, alcohol, recurring, about, picture, contact, resources, userID, ID2};
      expect(function foo() { GameCollection.define(defineObject2); }).to.throw(Error);
    });

    it('#define (item defined twice)', function test() {
      const ID3 = new Meteor.Collection.ObjectID();
      const defineObject2 = {gameName, category, category, maxPlayers, date, gameLength, location, smoking, alcohol, recurring, about, picture, contact, resources, userID, ID3};
      expect(function foo() { GameCollection.define(defineObject2); }).to.throw(Error);
    });
  });
}

