  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';


  import { host } from './localvars'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
  scales: {
    xAxes: [{
      ticks: {
        callback: function(value, index, values) {
          return value.toFixed(5);
        }
      }
    }]
  },
  tooltips: {
    callbacks: {
      label: function(tooltipItem, data) {
        var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
        return value.toFixed(5);
      }
    }
  }
};







function GraphPage() {
  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState("2023-08-01T10:00:00.000Z");
  const [endDate, setEndDate] = useState("2023-08-31T10:00:00.000Z");
  const [timeframe, setTimeframe] = useState("30 mins");
  const [mainExchange, setMainExchange] = useState("whitebit");



  const fetchData = async () => {
    try {
      const response = await axios.get(host + `/graph/${startDate}/${endDate}/${timeframe}/${mainExchange}`);
      const data = await response.data;
      setData(data);
      console.log(typeof data, data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, timeframe, mainExchange]);


  if (data === null) {
    return <div>Loading ^ ^ ...</div>;
  }
  console.log(data)
  const mainBitstampDifference = data.map(record => parseFloat(record.diffMainBitstamp).toFixed(5))
  const mainKrakenDifference   = data.map(record => parseFloat(record.diffMainKraken).toFixed(5))
  const mainWhitebitDifference = data.map(record => parseFloat(record.diffMainWhitebit).toFixed(5))
  
  const labels = data.map(record => new Date(record.datetime).toLocaleString('en-US', { timeZone: 'Europe/Kiev' }))

  const dataset = {
    labels,
    datasets: [
      {
        label: 'WHITEBIT',
        data: mainWhitebitDifference,
        borderColor: 'rgba(255, 255, 0, 0.5)',
        backgroundColor: 'rgba(255, 255, 0, 1)',
        borderWidth: 1.6,
        pointRadius: 0.2,
      },
      {
        label: 'BITSTAMP',
        data: mainBitstampDifference,
        borderColor: 'rgba(53, 235, 162, 0.5)',
        backgroundColor: 'rgba(53, 235, 162, 0.5)',
        borderWidth: 1,
        pointRadius: 0.1,
      
      },
      {
        label: 'KRAKEN',
        data: mainKrakenDifference,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderWidth: 0.8,
        pointRadius: 0.2,

      },
    ],
  };
  return (
    <div>
      <form>
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
        mainExchange:
          <select value={mainExchange} onChange={event => setMainExchange(event.target.value)}>
            <option value="whitebit">WHITEBIT</option>
            <option value="bitstamp">BITSTAMP</option>
            <option value="kraken">KRAKEN</option>
          </select>
        </label>
      </form>
      <Line options={options} data={dataset} />
    </div>
  );
}

//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>{data ? `Data from server: ${JSON.stringify(data)}` : 'Loading...'}</p>
//       </header>
//     </div>
//   );
// }
export default GraphPage;

