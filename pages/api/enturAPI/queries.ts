
export const departureQuery = `
query($stopPlaceId: String!, $numberOfDepartures: Int!) {
    stopPlace(id: $stopPlaceId) {
        id
        name
        estimatedCalls(timeRange: 72100, numberOfDepartures: $numberOfDepartures) {     
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

export const stopQuery = `
query($stopPlaceId: String!) {
    stopPlace(id: $stopPlaceId) {
        id,
        name,
    }
}
`
