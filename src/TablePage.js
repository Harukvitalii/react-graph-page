// NewPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function TablePage() {
  const [dataBitstamp, setDataBitstamp] = useState(null);
  const [dataKraken, setDataKraken] = useState(null);
  const [startDate, setStartDate] = useState("2023-07-30T10:00:00.000Z");
  const [endDate, setEndDate] = useState("2023-07-31T10:00:00.000Z");
  const [timeframe, setTimeframe] = useState("10 min");
  const [sortByBitstamp, setSortByBitstamp] = useState("datetime");
  const [sortByKraken, setSortByKraken] = useState("datetime");


  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };


  const fetchData = async () => {
    try {
      const rBit = await axios.get(`http://localhost:4444/table/${startDate}/${endDate}/${timeframe}/${sortByBitstamp}/bitstamp`);
      const dataBitstamp = await rBit.data;
      setDataBitstamp(dataBitstamp);
      const rKr = await axios.get(`http://localhost:4444/table/${startDate}/${endDate}/${timeframe}/${sortByKraken}/kraken`);
      const dataKraken = await rKr.data;
      setDataKraken(dataKraken);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  if (dataBitstamp === null || dataKraken === null) {
    return <div>Loading ^ ^ ...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
        ^ ^ Start Date: 
          <input
            type="text"
            value={startDate}
            onChange={event => setStartDate(event.target.value)}
          />
        </label>
        <label>
          End Date: 
          <input
            type="text"
            value={endDate}
            onChange={event => setEndDate(event.target.value)}
          />
        </label>
        
        <label>
          Timeframe: 
          <select value={timeframe} onChange={event => setTimeframe(event.target.value)}>
            <option value="30 seconds">30 seconds</option>
            <option value="1 min">1 min</option>
            <option value="3 min">3 min</option>
            <option value="5 min">5 mins</option>
            <option value="10 min">10 min</option>
            <option value="15 mins">15 mins</option>
            <option value="30 mins">30 mins</option>
            <option value="1 hour">1 hour</option>
            <option value="2 hours">2 hours</option>
            <option value="3 hours">3 hours</option>
            <option value="6 hours">6 hours</option>
            <option value="1 day">1 day</option>
            <option value="2 days">2 days</option>
            
          </select>
        </label>
        <label>
           Sort by Bitstamp:  
          <select value={sortByBitstamp} onChange={event => setSortByBitstamp(event.target.value)}>
            <option value="datetime asc">datetime asc</option>
            <option value="datetime desc">datetime desc</option>
            <option value="whitebitPrice asc">whitebit Price asc</option>
            <option value="whitebitPrice desc">whitebit Price desc</option>
            <option value="toExchangePrice asc">Bitstamp Price asc</option>
            <option value="toExchangePrice desc">Bitstamp Price desc</option>
            <option value="difference asc">Difference asc</option>
            <option value="difference desc">Difference desc</option>
          </select>
        </label>
        <label>
           Sort by Kraken:  
          <select value={sortByKraken} onChange={event => setSortByKraken(event.target.value)}>
            <option value="datetime asc">datetime asc</option>
            <option value="datetime desc">datetime desc</option>
            <option value="whitebitPrice asc">whitebit Price asc</option>
            <option value="whitebitPrice desc">whitebit Price desc</option>
            <option value="toExchangePrice asc">Kraken Price asc</option>
            <option value="toExchangePrice desc">Kraken Price desc</option>
            <option value="difference asc">Difference asc</option>
            <option value="difference desc">Difference desc</option>
          </select>
        </label>
        <button type="submit"> LETS DO IT </button>
      </form>
      <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        {/* Left Table */}
        <table>
          <thead>
            <tr>
              <th>Datetime </th>
              <th>Whitebit Price </th>
              <th>Bitstamp Price </th>
              <th>Whitebit-Bitstamp Difference (%)</th>
            </tr>
          </thead>
          <tbody>
            {dataBitstamp.map((recordData, i) => (
              <tr key={i}>
                <th>{recordData.datetime}</th>
                <td>{recordData.whitebitPrice}</td>
                <td>{recordData.toExchangePrice}</td>
                <td>{recordData.difference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ flex: 1 }}>
        {/* Right Table */}
        <table>
          <thead>
            <tr>
              <th>Datetime </th>
              <th>Whitebit Price </th>
              <th>Kraken Price </th>
              <th>Whitebit-Kraken Difference (%)</th>
            </tr>
          </thead>
          <tbody>
            {dataKraken.map((recordData, i) => (
              <tr key={i}>
                <th>{recordData.datetime}</th>
                <td>{recordData.whitebitPrice}</td>
                <td>{recordData.toExchangePrice}</td>
                <td>{recordData.difference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    </div>
  );
}
export default TablePage;