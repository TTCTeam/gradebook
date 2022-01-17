export const LOCATION_START_AT = 'LOCATION_START_AT';
export const LOCATION_ARRIVED = 'LOCATION_ARRIVED';

export function startAt(location) {
  return {
    type: LOCATION_START_AT,
    location,
  };
}

export function arrivedStartLocation() {
  return {
    type: LOCATION_ARRIVED,
  };
}
