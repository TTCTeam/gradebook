export const START_AT = 'START_AT';
export const ARRIVED = 'ARRIVED';

export function startAt(location) {
  console.log(location, 'location start action');
  return {
    type: START_AT,
    location,
  };
}

export function arrivedStartLocation() {
  return {
    type: ARRIVED,
  };
}
