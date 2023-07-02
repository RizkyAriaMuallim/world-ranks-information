import React from 'react';
import { useState } from 'react';

export default async function App(props) {
  const [name, setName] = useState("");

  return (
    <div className='App'>
      <input value={name} onChange={e => setName(e.target.value)}/>
      <h1>Hello {name}</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

// Log to console
console.log('Hello console')