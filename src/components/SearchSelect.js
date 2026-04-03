// src/components/SearchSelect.js
import React, { useState, useEffect, useRef } from 'react';
import './SearchSelect.css';

function SearchSelect({ 
  options, 
  placeholder = "Selecciona un destino", 
  onSelect,
  value,
  className = ""
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const filtered = options.filter(option =>
      option.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onSelect(option);
    setSearchTerm('');
    setIsOpen(false);
  };

  const getDisplayValue = () => {
    if (value) {
      return `${value.name}, ${value.country}`;
    }
    return '';
  };

  return (
    <div className={`search-select ${className}`} ref={dropdownRef}>
      <div 
        className="search-select-trigger" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="trigger-text">
          {value ? getDisplayValue() : placeholder}
        </span>
        <span className="trigger-icon">{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div className="search-select-dropdown">
          <div className="dropdown-search">
            <input
              type="text"
              placeholder="🔍 Buscar ciudad o país..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              className="dropdown-search-input"
            />
          </div>
          <div className="dropdown-options">
            {filteredOptions.length === 0 ? (
              <div className="no-options">No se encontraron resultados</div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option._id}
                  className="dropdown-option"
                  onClick={() => handleSelect(option)}
                >
                  <span className="option-name">{option.name}</span>
                  <span className="option-country">{option.country}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchSelect;