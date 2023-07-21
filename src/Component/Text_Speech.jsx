import React, { useEffect, useState } from 'react';

function ElevenLabsComponent() {
    const [data, setData] = useState("null sdfasdff asdfasf asdfsf ");
    const XI_API_KEY = '4fa6c0b059544762eea61dfae9328891';  // replace with your API key

    useEffect(() => {
        fetch('https://api.elevenlabs.io/v1/voices/21m00Tcm4TlvDq8ikWAM', {    // replace with your endpoint
            method: 'GET',      
            headers: {
                'xi-api-key': XI_API_KEY
            }
        })
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error:', error));
    },[data]);

    return (
        <div>
            {/* Render the fetched data here */}
            
            {data && <a href={data?.preview_url}>Download Audio </a>}
            {data&&<pre>{JSON.stringify(data)}</pre>}
        </div>
    );
}

export default ElevenLabsComponent;