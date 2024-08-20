import React, { useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const generatePassword = () => {
    if (length < 8) {
      setError('Password length must be at least 8 characters.');
      setPassword('');
      return;
    }
    
    setError(''); //to clear previous input

    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let availableChars = lowercaseChars;
    if (includeUppercase) availableChars += uppercaseChars;
    if (includeNumbers) availableChars += numberChars;
    if (includeSymbols) availableChars += symbolChars;

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * availableChars.length);
      generatedPassword += availableChars[randomIndex];
    }
    setPassword(generatedPassword);
  };

  return (
    <div className="App">
      <h1>Password Generator</h1>
      <div className='container'>
        <div className="settings">
          <label>
            Length:
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              min="8"
              max="32"
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
            />
            Include Uppercase Letters
          </label>
          <label>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            Include Numbers
          </label>
          <label>
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
            Include Symbols
          </label>
          <button onClick={generatePassword}>Generate Password</button>
        </div>
        {error && <p className="error">{error}</p>}
        {password && (
          <div className="result">
            <h2>Your Generated Password:</h2>
            <p>{password}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
