import { Alien } from "../wormhole/aliens-list/alien/alien.model";
import { Traveler } from "../wormhole/travelers-list/traveler/traveler.model";
import { TripDetails } from "./trip-details";

export interface Trip {
  alien: Alien,
  traveler: Traveler,
  tripDetails: TripDetails
}
