interface EnturFetchProps {
    query: string;
    variables?: Record<string, unknown>;
}
const client = {
    fetch: ({query, variables = {}}: EnturFetchProps) => fetch('https://api.entur.io/journey-planner/v2/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'ET-Client-Name': 'kjelland-jernbanetorget' },
        body: JSON.stringify({
            query,
            variables
        }),
    })
    .then((response) => response.json())
    .catch((error) => error)
}

export default client;