import React, { useEffect, useState } from "react";

function ElevenLabsComponent({ data = "sonia" }) {
  const [data1, setData1] = useState(null);
  const XI_API_KEY = "4fa6c0b059544762eea61dfae9328891"; // replace with your API key

  useEffect(() => {
    fetch("https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM?optimize_streaming_latency=0", {
      // replace with your endpoint
      method: "POST",
      headers: {
        "xi-api-key": XI_API_KEY,
        'accept': 'audio/mpeg',
        "Content-Type": "application/json",
        accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text: data,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0,
          similarity_boost: 0,
          style: 0.5,
          use_speaker_boost: true,
        },
      }),
    })
      .then((response) => response.json())
      .then((res) => setData1(res))
      .catch((error) => console.error("Error:", error));
  }, [data]);
  console.log(data1, "data1");
  return (
    <div>
      {/* Render the fetched data here */}

      {data1 && <a href={data1?.preview_url}>Download Audio </a>}
      {data1 && <pre>{JSON.stringify(data1)}</pre>}
    </div>
  );
}

export default ElevenLabsComponent;
