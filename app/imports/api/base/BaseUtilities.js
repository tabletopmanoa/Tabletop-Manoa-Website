import { UserToGames } from '/imports/api/games/UserToGamesCollection.js';
import { Games } from '/imports/api/games/GameCollection.js';

export function removeAllEntities() {
  UserToGames.removeAll();
  Games.removeAll();
}
