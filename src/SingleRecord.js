// NewPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { host } from './localvars'
console.log('host', host)



function SingleRecordPage() {
  const [dataTable, setDataTable] = useState(null);

  const fetchData = async () => {
    try {
      const reqv = await axios.get(host + `/table/single`);
      const dataTable = await reqv.data;
      setDataTable(dataTable);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);


  if (dataTable === null) {
    return <div>Loading ^ ^ ...</div>;
  }
  const minValue = Math.min(dataTable.whitebitPrice, dataTable.bitstampPrice, dataTable.krakenPrice);
  const maxValue = Math.max(dataTable.whitebitPrice, dataTable.bitstampPrice, dataTable.krakenPrice);

  // Calculate the middle value
  const middleValueString = parseFloat(dataTable.whitebitPrice) + parseFloat(dataTable.bitstampPrice) + parseFloat(dataTable.krakenPrice) - minValue - maxValue;
  const middleValue = parseFloat(middleValueString.toFixed(5));
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div >
        {/* Left Table */}
        <table style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '0.85rem' }} >Datetime </th>
              <th style={{ padding: '0.85rem' }} >Whitebit Price </th>
              <th style={{ padding: '0.85rem' }} >Bitstamp Price </th>
              <th style={{ padding: '0.85rem' }} >Kraken Price </th>
            </tr>
          </thead>
          <tbody>
          <tr key={1}>
            <td style={{ border: '1px solid #000', padding: '0.5rem' }}>
              {new Date(dataTable.datetime).toLocaleString('en-US', { timeZone: 'Europe/Kiev' })}
            </td>
            <td style={{ 
              border: '1px solid #000', 
              padding: '0.5rem',
              backgroundColor: parseFloat(dataTable.whitebitPrice) === minValue ? 'rgb(239, 33, 33, 0.45)' : (parseFloat(dataTable.whitebitPrice) === middleValue ? 'rgb(239, 33, 33, 0.15)' : 'rgb(33, 239, 66, 0.5)')
            }}>
              {dataTable.whitebitPrice}$
            </td>
            <td style={{ 
              border: '1px solid #000', 
              padding: '0.5rem',
              backgroundColor: parseFloat(dataTable.bitstampPrice) === minValue ? 'rgb(239, 33, 33, 0.45)' : (parseFloat(dataTable.bitstampPrice) === middleValue ? 'rgb(239, 33, 33, 0.15)' : 'rgb(33, 239, 66, 0.5)')
            }}>
              {`${dataTable.bitstampPrice}$ (${dataTable.diffWhiteBitstamp > 0 ? '+' : ''}${dataTable.diffWhiteBitstamp.slice(0,5)}%)`}
            </td>
            <td style={{ 
              border: '1px solid #000', 
              padding: '0.5rem',
              backgroundColor: parseFloat(dataTable.krakenPrice) === minValue ? 'rgb(239, 33, 33, 0.45)' : (parseFloat(dataTable.krakenPrice) === middleValue ? 'rgb(239, 33, 33, 0.15)' : 'rgb(33, 239, 66, 0.5)')
            }}>
              {`${dataTable.krakenPrice}$ (${dataTable.diffWhiteKraken > 0 ? '+' : ''}${dataTable.diffWhiteKraken.slice(0,5)}%)`}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    </div>
  );
}
export default SingleRecordPage;