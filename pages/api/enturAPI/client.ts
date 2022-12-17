interface EnturFetchProps {
    query: string;
    variables?: Record<string, unknown>;
    signal?: AbortSignal;
}
const client = {
    fetch: ({query, variables = {}, signal}: EnturFetchProps) => fetch('https://api.entur.io/journey-planner/v2/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'ET-Client-Name': 'kjelland-jernbanetorget' },
        body: JSON.stringify({
            query,
            variables
        }),
        signal,
    })
    .then((response) => response.json())
    .catch((error) => error)
}

export default client;
