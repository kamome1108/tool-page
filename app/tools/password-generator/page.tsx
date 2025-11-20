"use client";

import { useState, useEffect, useCallback } from "react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let charset = "";
    if (includeUppercase) charset += uppercaseChars;
    if (includeLowercase) charset += lowercaseChars;
    if (includeNumbers) charset += numberChars;
    if (includeSymbols) charset += symbolChars;

    if (charset === "") {
      setPassword("");
      return;
    }

    let newPassword = "";
    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
      newPassword += charset[randomValues[i] % charset.length];
    }

    setPassword(newPassword);
    setCopied(false);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        Secure Password Generator
      </h1>

      <div className="w-full max-w-md bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700">
        {/* Password Display */}
        <div className="relative mb-6">
          <input
            type="text"
            value={password}
            readOnly
            className="w-full bg-gray-900 text-green-400 text-2xl font-mono p-4 rounded-lg border border-gray-600 focus:outline-none focus:border-cyan-500 transition-colors"
          />
          <button
            onClick={copyToClipboard}
            className="absolute right-2 top-2 bottom-2 bg-gray-700 hover:bg-gray-600 text-white px-4 rounded-md transition-colors flex items-center justify-center"
          >
            {copied ? (
              <span className="text-green-400 font-bold">Copied!</span>
            ) : (
              <span>Copy</span>
            )}
          </button>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="flex justify-between mb-2 text-gray-300">
              <span>Length: {length}</span>
            </label>
            <input
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="w-5 h-5 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500 focus:ring-2"
              />
              <span className="text-gray-300">Uppercase</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="w-5 h-5 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500 focus:ring-2"
              />
              <span className="text-gray-300">Lowercase</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-5 h-5 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500 focus:ring-2"
              />
              <span className="text-gray-300">Numbers</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-5 h-5 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500 focus:ring-2"
              />
              <span className="text-gray-300">Symbols</span>
            </label>
          </div>
        </div>

        <button
          onClick={generatePassword}
          className="w-full mt-8 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 rounded-lg shadow-lg transform transition hover:scale-105"
        >
          Generate New Password
        </button>
      </div>
      
      <div className="mt-12 text-gray-500 text-sm max-w-md text-center">
        <p>Securely generated in your browser using <code>crypto.getRandomValues()</code>. No data is ever sent to a server.</p>
      </div>
    </div>
  );
}
