import React, { useEffect, useRef, useState } from 'react';

 import "react-country-state-city/dist/react-country-state-city.css";
 import {Country , State , City} from 'country-state-city';
 import './AddTodo.css';

const AddTodo = ({ addTodo, onUpdate, editData, setEditData }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [countryid, setCountryid] = useState('');
  const [stateid, setStateid] = useState('');
  const [cityid , setCityid] = useState('');
  const [country, setCountry] = useState({
    name : "",
    isoCode : ""
  });
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);

  const countryRef = useRef(0);
  const stateRef = useRef(0);
  const cityRef = useRef(0);
  
  const handleCountryChange = (selectedCountry) => {
    setCountry(selectedCountry);
    console.log(selectedCountry)

    // Clear the state when the country changes
    setState('');
    setCity('');
  };

  const handleStateChange = (selectedState) => {
    setState(selectedState);
  
    // Find the state code using the selected country and state name
    const stateCode = findStateCode(selectedState, country);
    console.log(stateCode, "Statecode is");
  
    // Clear the city when the state changes
    setCity('');
  
    // Fetch and update the list of cities when both country and state are selected
    fetchCities(country, stateCode);
  };

  const findStateCode = (selectedState, countryCode) => {
    const states = State.getStatesOfCountry(countryCode);
    const selectedStateData = states.find((st) => st.name === selectedState);
    return selectedStateData ? selectedStateData.isoCode : '';
  };
  const fetchCities = (countryCode, stateCode) => {
    // Fetch and update the list of cities when both country and state are selected
    if (countryCode && stateCode) {
      console.log("Fetching cities for Country:", countryCode, "and Statecode:", stateCode);
      const citiesOfState = City.getCitiesOfState(countryCode, stateCode);
      console.log("Cities:", citiesOfState);
      setCities(citiesOfState);
    }
  };

  const handleCityChange = (selectedCity) => {
    setCity(selectedCity);
    console.log("City changed" , setCity);
  };

  useEffect(() => {
    if (editData) {
      const { name, number, email, address ,country , state , city ,countryid ,stateid ,cityid} = editData;
      setName(name || '');
      setNumber(number || '');
      setEmail(email || '');
      setAddress(address || '');
      setCountry(country || '');
      setState(state || '');
      setCity(city || '');
      setCountryid(countryid || '');
      setStateid(stateid || '');
      setCityid(cityid || '');   
      
    } else {
      // Reset the form fields if there is no editData
      setName('');
      setNumber('');
      setEmail('');
      setAddress('');
      setCountryid('');
      setStateid('');
      setCityid('');
      setCity('');
      setState('');
      setCountry('')
    }
  }, [editData]);

  const resetDropdowns = () => {
    setCountryid('');
    setStateid('');
    setCityid('');
    setCountry('');
    setState('');
    setCity('');
    countryRef.current && countryRef.current.reset();
    stateRef.current && stateRef.current.reset();
    cityRef.current && cityRef.current.reset();
  };

  // Submit function 

 const submit = (e) => {
  e.preventDefault();

  // Basic form validations
  if (!number || !name || !email || !address || !country || !state || !city) {
    alert("Fields cannot be empty!");
    return;
  }
  if (number.length !== 10) {
    alert("Please enter a 10-digit number!");
    setNumber('');
    return;
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    alert("Enter a valid email address!!");
    setEmail('');
    return;
  }

  if (editData) {
    onUpdate({
      ...editData,
      name,
      number,
      email,
      address,
      countryid,
      stateid,
      cityid,
      country,
      state,
      city
    });
    setEditData(null); // Clear the editData state after updating
  } else {
    addTodo(name, number, email, address, countryid, stateid, cityid, country, state, city);
  }

  // Reset form fields
  setName('');
  setNumber('');
  setEmail('');
  setAddress('');
  setCountryid('');
  setStateid('');
  setCityid('');
  setCountry('');
  setState('');
  setCity('');
};

useEffect(() => {
  // Perform actions based on the updated state here
  // For example, you can log the values after the state is updated
  console.log("Updated state:", { name, number, email, address, country, state, city });

  // Fetch and update the list of cities when both country and state are selected
  if (country && state) {
    const stateCode = findStateCode(state, country);
    fetchCities(country, stateCode);
  }
}, [name, number, email, address, country, state, city]);
  useEffect(() => {
    // Perform actions based on the updated state here
    // For example, you can log the values after the state is updated
    
  }, [name, number, email, address, country, state, city]); // Include all relevant state variables in the dependency array
  
  
  

  return (
    <div className="text-center container my-3">
      <form className='my-3'>
        <h3 className='mb-4'>Employee Management!</h3>

        <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="desc">Employee Name</label>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            id="mobile"
            placeholder="Enter Name"
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="number">Mobile</label>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="form-control"
            id="mobile"
            placeholder="Enter Number"
            pattern="\d{10}"
            title="Please enter a 10-digit number"
            required
          />
        </div>
        </div>
        <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="desc">Email</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="desc"
            
            placeholder="Enter email"
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            title="Please enter a valid email address"
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="desc">Address</label>
          <input
            type="text"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
            className="form-control"
            id="desc"
            placeholder="Enter Address"
          />
        </div>
        </div>
        <div className="form-row">
      <div className="form-group col-md-6">
        <label htmlFor="country">Country</label>
        <select
          className="form-control"
          value={country}
          onChange={(e) => handleCountryChange(e.target.value)}
        >
          <option value="" disabled>
            Select Country
          </option>
          {Country.getAllCountries().map((countryOption) => (
            <option key={countryOption.isoCode} value={countryOption.isoCode}>
              {countryOption.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group col-md-6">
        <label htmlFor="state">State</label>
        <select
          className="form-control"
          value={state}
          onChange={(e) => handleStateChange(e.target.value)}
        >
          <option value="" disabled>
            Select State
          </option>
          {State.getStatesOfCountry(country)?.map((st) => (
            <option key={st.isoCode} value={st.name}>
              {st.name}
            </option>
          ))}
        </select>
      </div>
</div>
<div className="form-group">
  <label htmlFor="city">City</label>
  <select
    className="form-control"
    value={city}
    onChange={(e) => handleCityChange(e.target.value)}
  >
    <option value="" disabled>
      Select City
    </option>
    {cities.map((cityObj) => (
      <option key={cityObj.name} value={cityObj.name}>
        {cityObj.name}
      </option>
    ))}
  </select>
</div>
          <hr/>
        <button type="submit" 
        className={`btn ${editData ? 'btn-warning' : 'btn-success'}`}
        onClick={submit}>
          {editData ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
