import React, { useState } from 'react';
import './App.css';
import Checkbox from './components/Checkbox';
import Button from './components/Button';

const App = () => {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState('');

  const generatePassword = () => {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let allChars = '';
    if (includeUppercase) allChars += uppercaseChars;
    if (includeLowercase) allChars += lowercaseChars;
    if (includeNumbers) allChars += numberChars;
    if (includeSymbols) allChars += symbolChars;

    if (allChars === '') {
      alert('Please select at least one character type!');
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      generatedPassword += allChars[Math.floor(Math.random() * allChars.length)];
    }

    setPassword(generatedPassword);
    evaluatePasswordStrength(generatedPassword);
  };

  const evaluatePasswordStrength = (generatedPassword) => {
    let strength = 'Weak';
    const strongCriteria = [
      /[a-z]/.test(generatedPassword),
      /[A-Z]/.test(generatedPassword),
      /\d/.test(generatedPassword),
      /[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(generatedPassword),
    ];

    const passedCriteria = strongCriteria.filter(Boolean).length;
    if (generatedPassword.length >= 12 && passedCriteria >= 3) {
      strength = 'Strong';
    } else if (generatedPassword.length >= 8 && passedCriteria >= 2) {
      strength = 'Medium';
    }

    setPasswordStrength(strength);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  return (
    <div className="App">
      <h1>Password Generator</h1>
      <div className="settings">
        <label>Password Length: {passwordLength}</label>
        <input
          type="range"
          min="8"
          max="20"
          value={passwordLength}
          onChange={(e) => setPasswordLength(e.target.value)}
        />

        <Checkbox
          label="Include Uppercase Letters"
          checked={includeUppercase}
          onChange={(e) => setIncludeUppercase(e.target.checked)}
        />
        <Checkbox
          label="Include Lowercase Letters"
          checked={includeLowercase}
          onChange={(e) => setIncludeLowercase(e.target.checked)}
        />
        <Checkbox
          label="Include Numbers"
          checked={includeNumbers}
          onChange={(e) => setIncludeNumbers(e.target.checked)}
        />
        <Checkbox
          label="Include Symbols"
          checked={includeSymbols}
          onChange={(e) => setIncludeSymbols(e.target.checked)}
        />
      </div>

      <Button text="Generate Password" onClick={generatePassword} />

      {password && (
        <div className="result">
          <h2>{password}</h2>
          <p>Password Strength: {passwordStrength}</p>
          <Button text="Copy to Clipboard " onClick={copyPassword} />
        </div>
      )}
    </div>
  );
};

export default App;
