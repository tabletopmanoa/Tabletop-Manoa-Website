import { Games } from '/imports/api/games/GameCollection.js';
import { UserToGames } from '/imports/api/games/UserToGamesCollection.js';

export function removeAllEntities() {
  Games.removeAll();
  UserToGames.removeAll();
}
