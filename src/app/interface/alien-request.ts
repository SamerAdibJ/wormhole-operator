import { Alien } from "../wormhole/aliens-list/alien/alien.model";

export interface AlienRequest {
  alien: Alien,
  destination: number
}
