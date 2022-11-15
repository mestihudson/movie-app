import axios from 'axios'
import { useEffect, useState } from 'react'

import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api')
      .then(({ data }) => {
        console.log(data)
        setMessage(data.movies.length);
      })
      .catch((error) => {
        console.error(error)
        setMessage(error.response.data)
      })
  }, [message])

  return (
    <div className="App">
      <header className="App-header">
        <h2>{message}</h2>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
