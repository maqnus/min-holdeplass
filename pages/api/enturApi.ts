// TODO: add variable placeId and number of departures
export const stopPlace = { query: `
    query {
        stopPlace(id: "NSR:StopPlace:4000") {
            description
            name
            estimatedCalls(numberOfDepartures: 4) {
              actualArrivalTime
              actualDepartureTime
              date
              realtime
              destinationDisplay {
                  frontText
              }
              expectedDepartureTime
              serviceJourney {
                line {
                  name
                  publicCode
                }
              }
            }
          }
    }`
};
