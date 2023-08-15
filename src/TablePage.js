// NewPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { host } from './localvars'
console.log('host', host)

function TablePage() {
  const [dataTable, setDataTable] = useState(null);
  const [startDate, setStartDate] = useState("2023-07-30T10:00:00.000Z");
  const [endDate, setEndDate] = useState("2023-07-31T10:00:00.000Z");
  const [timeframe, setTimeframe] = useState("30 mins");
  const [sortBy, setSortBy] = useState("datetime");


  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };


  const fetchData = async () => {
    try {
      const reqv = await axios.get(host + `/table/${startDate}/${endDate}/${timeframe}/${sortBy}`);
      const dataTable = await reqv.data;
      setDataTable(dataTable);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  if (dataTable === null) {
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
           Sort Table by:  
          <select value={sortBy} onChange={event => setSortBy(event.target.value)}>
            <option value="datetime asc">datetime asc</option>
            <option value="datetime desc">datetime desc</option>
            <option value="whitebitPrice asc">whitebit Price asc</option>
            <option value="whitebitPrice desc">whitebit Price desc</option>
            <option value="bitstampPrice asc">Bitstamp Price asc</option>
            <option value="bitstampPrice desc">Bitstamp Price desc</option>
            <option value="krakenPrice asc">Kraken Price asc</option>
            <option value="krakenPrice desc">Kraken Price desc</option>
            <option value="diffWhiteBitstamp asc">DifferenceWhiteBitstamp asc</option>
            <option value="diffWhiteBitstamp desc">DifferenceWhiteBitstamp desc</option>
            <option value="diffWhiteKraken asc">DifferenceWhiteKraken asc</option>
            <option value="diffWhiteKraken desc">DifferenceWhiteKraken desc</option>
          </select>
        </label>
        <button type="submit"> LETS DO IT </button>
      </form>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div >
        {/* Left Table */}
        <table style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '0.5rem' }} >Datetime </th>
              <th style={{ padding: '1.5rem' }} >Whitebit Price </th>
              <th style={{ padding: '1.5rem' }} >Bitstamp Price </th>
              <th style={{ padding: '1.5rem' }} >Kraken Price </th>
            </tr>
          </thead>
          <tbody>
            {dataTable.map((record, i) => (
              <tr key={i}>
              <td style={{ border: '1px solid #000', padding: '0.5rem' }}>{record.datetime}</td>
              <th style={{ border: '1px solid #000', padding: '0.5rem' }}>{record.whitebitPrice}$</th>
              <td style={{
                  border: '1px solid #000',
                  padding: '0.5rem',
                  backgroundColor: record.diffWhiteBitstamp > record.diffWhiteKraken ? 'rgb(0, 255, 0, 0.3)' : 'rgb(239, 31, 31, 0.2)'
                }}
              >
                {`${record.bitstampPrice}$ (${record.diffWhiteBitstamp > 0 ? '+' : ''}${record.diffWhiteBitstamp})`}
              </td>
              <td style={{
                  border: '1px solid #000',
                  padding: '0.5rem',
                  backgroundColor: record.diffWhiteKraken > record.diffWhiteBitstamp ? 'rgb(0, 255, 0, 0.3)' : 'rgb(239, 31, 31, 0.2)'
                }}
              >
                {`${record.krakenPrice}$ (${record.diffWhiteKraken > 0 ? '+' : ''}${record.diffWhiteKraken})`}
              </td>
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