import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import diseases from '../../diseases.json'
import Dexie from 'dexie'
import { useLiveQuery } from "dexie-react-hooks";
export const Test = () => {
  library.add(fas);
  const icons = Object.keys(fas).map((iconName, index) => (
    <div key={index}>
      <FontAwesomeIcon icon={fas[iconName]} /> {iconName}
    </div>
  ));

  // ____________________________________________
  //Task 1
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleResultClick = (disease) => {
    setSearchQuery(disease.name); // Populate the input field with the selected disease name
    setSearchResults([]); // Clear the search results
  };
  
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    const filteredResults = allItems.filter((disease) =>
      disease.name.toLowerCase().includes(query)
    );
    setSearchQuery(query);

    if (filteredResults.length === 1 && filteredResults[0].name.toLowerCase() === query) {
      // If the query matches exactly one disease, clear the search results
      setSearchResults([]);
    } else {
      setSearchResults(filteredResults.slice(0, 10)); // Limit to 10 results
    }
  };
  // ______________________________________________________
  //Task 2
  
  const db = new Dexie('MarketList');
  db.version(1).stores(
    { items: "++id,name" }
  )


  const allItems = useLiveQuery(() => db.items.toArray(), []);
  if (!allItems) {
    console.log('first')
    return null
  }



const addItemToDb = async event => {
    const name = document.querySelector('.item-name').value
   const is= allItems.some((item)=>{
      
      return item.name=name
    })
    if(is){
      console.log('found')
      return null
    }
    event.preventDefault()
   
      await db.items.add({name});
    
  //  addItemToDb()
   
  }
// addItemToDb()
  const markAsPurchased = async (id, event) => {
    if (event.target.checked) {
      await db.items.update(id, {itemHasBeenPurchased: true})
    }
    else {
      await db.items.update(id, {itemHasBeenPurchased: false})
    }
  }
  const removeItemFromDb = async id => {
    await db.items.delete(id)
  }
  const itemData = allItems.map(({ id, name }) => (
    <div className="row" key={id}>
      <p className="col s5">
        <label>
          
          <span className="black-text">{name}</span>
        </label>
      </p>
      <i onClick={() => removeItemFromDb(id)} className="col s2 material-icons delete-button">
        delete
      </i>
    </div>
  ))
  return (
    // <div style={{ backgroundColor: 'white' }}>{icons}</div>
    <>
      <input
        type="text"
        placeholder="Search for a disease"
        value={searchQuery}
        onChange={handleSearch}
      />

      {searchQuery && searchResults.map((disease) => (
        <div key={disease.name} onClick={() => handleResultClick(disease)}>
          <h3>{disease.name}</h3>
          <p>{disease.description}</p>
        </div>
      ))}

      <p>_________________________________________________</p>
      <p>_________________________________________________</p>
      <div className="container">
    <h3 className="green-text center-align">Market List App</h3>
    <form className="add-item-form" onSubmit={event => addItemToDb(event)} >
      <input type="text" className="item-name" placeholder="Name of item" required/>
      
      <button type="submit" className="waves-effect waves-light btn right">Add item</button>
    </form>
    {allItems.length > 0 &&
      <div className="card white darken-1">
        <div className="card-content">
          <form action="#">
            { itemData }
          </form>
        </div>
        </div>
    }
  </div>
    </>

  )


}
