import { useEffect,useState } from "react";

import './Weather.css';

export default function Weather(){
  const [city,setCity]=useState('');
  const [filteredData,setFilteredData]=useState(null);
  const [error,setError]=useState(null)

  const searchCity=()=>{
    const APIKey= '494be01dc72f965037eb55a702841273';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
    .then((res)=>res.json())
    .then((response)=>{
      if(response.cod === 200){
        setFilteredData(response)
  
      }else{
        setError(response)
      }
    });
    setCity('')
  }

  const handleCity=(e)=>{
    const {value}=e.target;
    setCity(value);
    setFilteredData(null);
    setError(null);
  }

  useEffect(()=>{
    return(()=>{
      setFilteredData(null);
      setCity('')
    })
  },[])

  return (
    <div>
      <form className="weather-form">
        <input 
        type='text' 
        placeholder='Enter City,State,Country' 
        className="search-input"
        value={city} 
        onChange={(e)=>handleCity(e)}/>

        <button 
        type="button" 
        className="search-btn"
        onClick={searchCity}>Search</button>

      </form>

      {filteredData ? 
      <div className="weather-report">
        <h1>City : {filteredData?.name}</h1>
        <span className="">TimeZone : {filteredData?.timezone}</span>
        <span className="">Visibility : {filteredData?.visibility}</span>
        {filteredData?.weather.map((weatherType)=>(
          <div className="">Weather : {weatherType.description}</div>
        ))}
      </div>
      :<div className={error?.message && "error-message"}>{error?.message}</div>}
    </div>
  );
}
