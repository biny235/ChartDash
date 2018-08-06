import React from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import fileDownload from 'js-file-download';

class Charts extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      firstAM: 0,
      firstNZ: 0,
      lastAM: 0,
      lastNZ: 0,
      male: 0,
      female: 0,
      ages: [],
      mostPopulusStatesFemale: [],
      mostPopulusStatesMale: [],
      mostPopulusStates: []
    };
    this.onClick = this.onClick.bind(this);
    this.clear = this.clear.bind(this);
  }
  componentDidMount() {
    let data = window.localStorage.getItem('data');
    try{
      data = JSON.parse(data)
    }catch(error){
      console.log(error)
    }
    this.setState(data);

  }
  onClick() {
    axios
      .post('/api/analyze/JSON/download/json', { data: this.state })
      .then(res => {
        if('json'){
          fileDownload(JSON.stringify(res.data), `analysis.json`)
        }
      });
  }
  clear(){
    window.localStorage.clear()
    this.props.history.push('/')

  }

  render() {
    const {
      ages,
      mostPopulusStates,
      mostPopulusStatesMale,
      mostPopulusStatesFemale,
      firstAM,
      firstNZ,
      lastAM,
      lastNZ,
      male,
      female,
      total
    } = this.state;
    const { onClick, clear } = this;
    return (
      <div className='chart-grid'>
        <div>
          <h2>Chart Dashboard</h2>
        </div>
        <div>
          <h2>Total People: {total}</h2>
        </div>
        <div>
          <div className='btn-group'>
            <button type='button' className='btn btn-success' onClick={onClick}>
              Download Data
            </button>
            <button type='button' className='btn btn-danger' onClick={clear}>
              Clear
            </button>
          </div>
        </div>
        <Chart
          chartType='PieChart'
          data={[['Gender', 'Total'], ['Male', male], ['Female', female]]}
          height='170px'
          options={{
            title: 'Male v. Female',
            pieHole: 0.2
          }}
        />
        <Chart
          chartType='PieChart'
          data={[['First Name', 'Total'], ['A-M', firstAM], ['N-Z', firstNZ]]}
          height='170px'
          options={{
            title: 'First Name A-M v. N-Z',
            pieHole: 0.2
          }}
        />
        <Chart
          chartType='PieChart'
          data={[['Last Name', 'Total'], ['A-M', lastAM], ['N-Z', lastNZ]]}
          height='170px'
          options={{
            title: 'Last Name A-M v. N-Z',
            pieHole: 0.2
          }}
        />
        <Chart
          chartType='ColumnChart'
          data={[['State', ''], ...mostPopulusStates]}
          height='150px'
          options={{
            title: 'Most Populus States'
          }}
        />
        <Chart
          chartType='ColumnChart'
          data={[['State', ''], ...mostPopulusStatesMale]}
          height='150px'
          options={{
            title: 'Most Populus States Male'
          }}
        />
        <Chart
          chartType='ColumnChart'
          data={[['State', ''], ...mostPopulusStatesFemale]}
          height='150px'
          options={{
            title: 'Most Populus States Female'
          }}
        />
        <div className='ages-chart'>
          <Chart
            chartType='ColumnChart'
            data={[['Age Range', 'Total'], ...ages]}
            height='170px'
            options={{
              title: 'Age Breakdown'
            }}
          />
          </div>
      </div>
    );
  }
}

export default Charts;
