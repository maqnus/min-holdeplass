const enturClient = {
    // TODO: define proper type
    fetch: (query: any) => fetch('https://api.entur.io/journey-planner/v2/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'ET-Client-Name': 'kjelland-jernbanetorget' },
        body: JSON.stringify(query),
    })
        .then((response) => {
            const reader = response.body?.getReader();
            return new ReadableStream({
                start(controller) {
                    return pump();
                    // TODO: Define proper type
                    function pump(): any {
                        return reader?.read().then(({ done, value }) => {
                            // When no more data needs to be consumed, close the stream
                            if (done) {
                                controller.close();
                                return;
                            }
                            // Enqueue the next data chunk into our target stream
                            controller.enqueue(value);
                            return pump();
                        });
                    }
                }
            })
        })
        .then((stream) => new Response(stream))
        .then((response) => response.blob())
        .then((blob) => blob.text())
        .then((text) => JSON.parse(text))
        .then((json) => json)
        .catch((error) => console.error(error))
}

export default enturClient;