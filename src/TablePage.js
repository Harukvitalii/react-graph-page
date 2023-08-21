// NewPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { host } from './localvars'
console.log('host', host)

function TablePage() {
  const [dataTable, setDataTable] = useState(null);
  const [startDate, setStartDate] = useState("2023-08-01T10:00:00.000Z");
  const [endDate, setEndDate] = useState("2023-08-05T10:00:00.000Z");
  const [timeframe, setTimeframe] = useState("2 hours");
  const [sortBy, setSortBy] = useState("datetime asc");



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
  }, [startDate, endDate, timeframe, sortBy]);

  if (dataTable === null) {
    return <div>Loading ^ ^ ...</div>;
  }
  const worstPriceColor  = 'rgb(239, 33, 33, 0.45)'
  const bestPriceColor   = 'rgb(33, 239, 66, 0.5)'
  const middlePriceColor = 'rgb(239, 33, 33, 0.15)'

  const dataTableColors = dataTable.map((record, i) => { 
    const minValue = Math.min(record.whitebitPrice, record.bitstampPrice, record.krakenPrice);
    const maxValue = Math.max(record.whitebitPrice, record.bitstampPrice, record.krakenPrice);
  
    // Calculate the middle value
    const middleValueString = parseFloat(record.whitebitPrice) + parseFloat(record.bitstampPrice) + parseFloat(record.krakenPrice) - minValue - maxValue;
    const middleValue = parseFloat(middleValueString.toFixed(5));
    const whiteBitColor = parseFloat(record.whitebitPrice) === minValue ? bestPriceColor : (parseFloat(record.whitebitPrice) === middleValue ? middlePriceColor : worstPriceColor)
    const bitstampColor = parseFloat(record.bitstampPrice) === minValue ? bestPriceColor : (parseFloat(record.bitstampPrice) === middleValue ? middlePriceColor : worstPriceColor)
    const krakenColor   = parseFloat(record.krakenPrice)   === minValue ? bestPriceColor : (parseFloat(record.krakenPrice)   === middleValue ? middlePriceColor : worstPriceColor)
  
    return [whiteBitColor,bitstampColor,krakenColor]
  })


  return (
    <div>
      <form >
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
              <td style={{ border: '1px solid #000', padding: '0.5rem' }}>{new Date(record.datetime).toLocaleString('en-US', { timeZone: 'Europe/Kiev' })}</td>
              <th style={{ 
                  border: '1px solid #000', 
                  padding: '0.5rem',
                  backgroundColor: dataTableColors[i][0] 
                  }}
                >{record.whitebitPrice}$</th>
              <td style={{
                  border: '1px solid #000',
                  padding: '0.5rem',
                  backgroundColor: dataTableColors[i][1]
                }}
              >
                {`${record.bitstampPrice}$ (${record.diffWhiteBitstamp > 0 ? '+' : ''}${record.diffWhiteBitstamp.slice(0,5)}%)`}
              </td>
              <td style={{
                  border: '1px solid #000',
                  padding: '0.5rem',
                  backgroundColor: dataTableColors[i][2]
                }}
              >
                {`${record.krakenPrice}$ (${record.diffWhiteKraken > 0 ? '+' : ''}${record.diffWhiteKraken.slice(0,5)}%)`}
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