import React, { useState, useEffect, useRef } from 'react';

export const DropDown = ({onChange}) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    // Attach the event listener
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    const fetchedSuggestions = fetchSuggestions(value);
    setSuggestions(fetchedSuggestions);

    setShowSuggestions(fetchedSuggestions.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
    onChange(suggestion)
  };

  const fetchSuggestions = (value) => {
    const options = ['apple', 'banana', 'cherry', 'grape', 'lemon'];
    return options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }} ref={dropdownRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add state transition"
        style={{
          padding: '10px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          width: '500px',
        }}
      />
      {showSuggestions && (
        <ul
          style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            right: '0',
            backgroundColor: '#fff',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
            padding: '0',
            margin: '0',
            listStyleType: 'none',
            zIndex: '1',
          }}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                padding: '10px',
                cursor: 'pointer',
                borderBottom: '1px solid #ccc',
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
