import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [greeting, setGreeting] = useState<string>('');
  const [echoText, setEchoText] = useState<string>('');
  const [echoResponse, setEchoResponse] = useState<string>('');

  useEffect(() => {
    // Fetch the initial message when the component mounts
    fetch('http://localhost:8080')
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Error fetching message:', error));
  }, []);

  const handleGreeting = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`http://localhost:8080/hey/${name}`)
      .then(response => response.text())
      .then(data => setGreeting(data))
      .catch(error => console.error('Error fetching greeting:', error));
  };

  const handleEcho = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('http://localhost:8080/echo', {
      method: 'POST',
      body: echoText,
    })
      .then(response => response.text())
      .then(data => setEchoResponse(data))
      .catch(error => console.error('Error sending echo:', error));
  };

  return (
    <div className="App">
      <h1>Rust + React TypeScript Interface</h1>
      
      <section>
        <h2>Hello Endpoint</h2>
        <p>Message from server: {message}</p>
      </section>

      <section>
        <h2>Hey Endpoint</h2>
        <form onSubmit={handleGreeting}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <button type="submit">Get Greeting</button>
        </form>
        {greeting && <p>Server response: {greeting}</p>}
      </section>

      <section>
        <h2>Echo Endpoint</h2>
        <form onSubmit={handleEcho}>
          <input
            type="text"
            value={echoText}
            onChange={(e) => setEchoText(e.target.value)}
            placeholder="Enter text to echo"
          />
          <button type="submit">Send Echo</button>
        </form>
        {echoResponse && <p>Server echo: {echoResponse}</p>}
      </section>
    </div>
  );
}

export default App;