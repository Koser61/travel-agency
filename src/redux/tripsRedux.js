/* SELECTORS */

export const getAllTrips = ({trips}) => trips;

export const getFilteredTrips = ({trips, filters}) => {
  let output = trips;

  if(filters.searchPhrase){
    const pattern = new RegExp(filters.searchPhrase, 'i');
    output = output.filter(trip => pattern.test(trip.name));
  }

  output = output.filter(
    (trip) => trip.days >= filters.duration.from && trip.days <=filters.duration.to
  );

  if(filters.tags) {
    const pattern = new RegExp(filters.tags, 'i');
    output = output.filter(trip => pattern.test(trip.tags));
  }

  output = output.sort((a, b) => {
    const costA = Number(a.cost.replace(/[^0-9.-]+/g,''));
    const costB = Number(b.cost.replace(/[^0-9.-]+/g,''));
    return costB- costA;
  });

  return output;
};

export const getTripById = ({trips}, tripId) => {
  const filtered = trips.filter(trip => trip.id == tripId);

  return filtered.length ? filtered[0] : {error: true};
};

export const getTripsForCountry = ({trips}, countryCode) => {
  const filtered = trips.filter(trip => trip.country.code == countryCode);

  return filtered.length ? filtered : [{error: true}];
};

/* ACTIONS */

/*
// action name creator
const reducerName = 'trips';
const createActionName = name => `app/${reducerName}/${name}`;

// action types


// action creators


// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}
*/
