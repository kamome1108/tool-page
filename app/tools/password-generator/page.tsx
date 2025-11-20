"use client";

import { useState, useEffect, useCallback } from "react";
import ToolLayout from "../../components/ToolLayout";

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
    <ToolLayout
      title="Secure Password Generator"
      description="Generate strong, secure passwords instantly. 100% client-side, no data leaves your device."
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
          {/* Password Display */}
          <div className="relative mb-6">
            <input
              type="text"
              value={password}
              readOnly
              className="w-full bg-gray-50 text-blue-600 text-xl sm:text-2xl font-mono p-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              onClick={copyToClipboard}
              className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 rounded-lg transition-colors font-medium min-h-11"
            >
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <div>
              <label className="flex justify-between mb-3 text-gray-700 font-medium">
                <span>Length: {length}</span>
              </label>
              <input
                type="range"
                min="4"
                max="64"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 cursor-pointer min-h-11">
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-gray-700">Uppercase</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer min-h-11">
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-gray-700">Lowercase</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer min-h-11">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-gray-700">Numbers</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer min-h-11">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-gray-700">Symbols</span>
              </label>
            </div>
          </div>

          <button
            onClick={generatePassword}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-sm transition-colors min-h-11"
          >
            Generate New Password
          </button>
        </div>

        <div className="mt-8 text-gray-600 text-sm text-center bg-blue-50 p-4 rounded-xl">
          <p>
            🔒 Securely generated in your browser using <code className="bg-white px-2 py-1 rounded">crypto.getRandomValues()</code>.
            <br />No data is ever sent to a server.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
}
