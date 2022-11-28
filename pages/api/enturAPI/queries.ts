
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
                        publicCode
                        transportMode
                        presentation {
                            colour
                            textColour
                        }
                    }
                }
            }
        }
    }
}
`;
    