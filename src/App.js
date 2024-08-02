import React, { useState, useEffect } from 'react';

const PING_INTERVAL = 60000; // 2 minutes in milliseconds

const APIs = [
  {
    name: 'SmartBP Backend',
    url: 'https://smartbp-backend.onrender.com'
  },
  // Add more APIs here in the future
];

function App() {
  const [lastPingTimes, setLastPingTimes] = useState({});

  useEffect(() => {
    const pingAllApis = async () => {
      const newLastPingTimes = {};
      for (const api of APIs) {
        try {
          const response = await fetch(api.url);
          if (response.ok) {
            console.log(`Successfully pinged ${api.name}`);
            newLastPingTimes[api.name] = new Date().toLocaleString();
          } else {
            console.error(`Failed to ping ${api.name}: ${response.status}`);
          }
        } catch (error) {
          console.error(`Error pinging ${api.name}:`, error);
        }
      }
      setLastPingTimes(newLastPingTimes);
    };

    pingAllApis();
    const intervalId = setInterval(pingAllApis, PING_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <h1>API Pinger</h1>
      <p>This application pings the following APIs every {PING_INTERVAL / 1000} seconds to keep them Active:</p>
      <ul>
        {APIs.map(api => (
          <li key={api.name}>
            {api.name} - Last pinged: {lastPingTimes[api.name] || 'Not yet pinged'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;