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
  const [startDate, setStartDate] = useState("2023-07-30T10:00:00.000Z");
  const [endDate, setEndDate] = useState("2023-08-31T10:00:00.000Z");
  const [timeframe, setTimeframe] = useState("5 min");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(host + `/graph/${startDate}/${endDate}/${timeframe}`);
      const data = await response.data;
      setData(data);
      console.log(typeof data, data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  if (data === null) {
    return <div>Loading ^ ^ ...</div>;
  }
  console.log(data)
  const whitebitBitstampDifference = data.map(record => parseFloat(record.diffWhiteBitstamp).toFixed(5))
  const whitebitKrakenDifference   = data.map(record => parseFloat(record.diffWhiteKraken).toFixed(5))
  const labels = data.map(record => record.datetime)
  const whitebitWhitebitDifference = Array.from({ length: labels.length }, () => 0)

  const dataset = {
    labels,
    datasets: [
      {
        label: 'WHITEBIT',
        data: whitebitWhitebitDifference,
        borderColor: 'rgba(255, 255, 0, 0.5)',
        backgroundColor: 'rgba(255, 255, 0, 1)',
        borderWidth: 1.6,
        pointRadius: 0.2,
      },
      {
        label: 'BITSTAMP',
        data: whitebitBitstampDifference,
        borderColor: 'rgba(53, 235, 162, 0.5)',
        backgroundColor: 'rgba(53, 235, 162, 0.5)',
        borderWidth: 1,
        pointRadius: 0.1,
      
      },
      {
        label: 'KRAKEN',
        data: whitebitKrakenDifference,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderWidth: 0.8,
        pointRadius: 0.2,

      },
    ],
  };
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
        <button type="submit">Goo</button>
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

