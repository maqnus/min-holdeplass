// TODO: add variable placeId and number of departures
export const stopPlace = `
query($stopPlaceId: String!) {
    stopPlace(id: $stopPlaceId) {
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
}`;

export const departureBoard = `
query($stopPlaceId: String!) {
    stopPlace(id: $stopPlaceId) {
        id
        name
        estimatedCalls(timeRange: 72100, numberOfDepartures: 10) {     
        realtime
        aimedArrivalTime
        aimedDepartureTime
        expectedArrivalTime
        expectedDepartureTime
        actualArrivalTime
        actualDepartureTime
        date
        forBoarding
        forAlighting
        destinationDisplay {
            frontText
        }
        quay {
            id
        }
        serviceJourney {
            journeyPattern {
            line {
                id
                name
                transportMode
            }
            }
        }
        }
    }
}
`;
    