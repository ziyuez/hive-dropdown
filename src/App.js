import React, { Component, useState } from 'react';
import './App.css';
import Dropdown from './Components/Dropdown';

function App() {
  const [dd1Values, setdd1Values] = useState([
    {
      id: 0,
      title: 'Mangoes',
      selected: false,
    },
    {
      id: 1,
      title: 'Apples',
      selected: false
    },
    {
      id: 2,
      title: 'Bananas',
      selected: false
    },
    {
      id: 3,
      title: 'Pineapples',
      selected: false
    },
    {
      id: 4,
      title: 'Cherries',
      selected: false
    },
    {
      id: 5,
      title: 'Pears',
      selected: false
    },
    {
      id: 6,
      title: 'Mangosteen',
      selected: false
    },
    {
      id: 7,
      title: 'Jicama',
      selected: false
    }
  ]);

  const [dd2Values, setdd2Values] = useState([
    {
      id: 0,
      title: 'Celery',
      selected: false,
    },
    {
      id: 1,
      title: 'Tomatoes',
      selected: false
    },
    {
      id: 2,
      title: 'Kale',
      selected: false
    },
    {
      id: 3,
      title: 'Green Beans',
      selected: false
    },
    {
      id: 4,
      title: 'Lettuce',
      selected: false
    },
    {
      id: 5,
      title: 'Onions',
      selected: false
    }
  ]);

  const handleDropdown1 = (newOptions) => {
    setdd1Values(newOptions);
  }

  const handleDropdown2 = (newOptions) => {
    setdd2Values(newOptions);
  }

  return (
    <div className="App">
        <div className='DropdownContainer-sm'>
          <Dropdown isMultiselect 
          clearMessage="Clear All"
          selectMessage="Select all options"
          options={dd2Values}
          setOptions={handleDropdown2}/>
        </div>
        <div className='DropdownContainer-lg'>
          <Dropdown 
            placeholder="Please choose one option" 
            label="Fruits" 
            options={dd1Values}
            setOptions={handleDropdown1}
            searchBar
            maxDropdownHeight="45vh"
            />
        </div>
        <div className='OutputContainer'>
          <h2>Items selected from lists (bound to parent component)</h2>
          <h3>Selected Vegetables</h3>
          {dd2Values.map(option => (
            (option.selected) ? 
            <li key={option.title}>{option.title}</li>
            : null
                ))}
           <h3>Selected Fruit</h3>
            {dd1Values.map(option => (
            (option.selected) ? 
            <span key={option.title}>{option.title}</span>
            : null
                ))}
        </div>
    </div>
  );
}

export default App;
