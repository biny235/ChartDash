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
      mostPopulusStates: [],
      fileType: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.clear = this.clear.bind(this);
  }
  componentDidMount() {
    let data = window.localStorage.getItem('data');
    try {
      data = JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
    this.setState(data);
  }
  onChange(ev) {
    this.setState({ fileType: ev.target.value });
  }

  onClick() {
    const { fileType } = this.state;
    const data = JSON.parse(window.localStorage.getItem('data'))
    axios
      .post(`/api/analyze/JSON/download/${fileType}`, {data})
      .then(res => res.data)
      .then(file => {
        if (fileType === 'json') {
          fileDownload(JSON.stringify(file, null, "\t"), `analysis.json`);
        } else {
          fileDownload(file, `analysis.${fileType}`);
        }
      })
      .catch(err => console.log(err));
  }
  clear() {
    window.localStorage.clear();
    this.props.history.push('/');
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
      total,
      fileType
    } = this.state;
    const { onClick, clear, onChange } = this;
    return (
      <div className='chart-grid'>
        <div>
          <h2>Chart Dashboard</h2>
        </div>
        <div>
          <h2>Total People: {total}</h2>
        </div>
        <div className='input-group mb-3'>
          <select className='custom-select' onChange={onChange}>
            <option value='' defaultValue>File Type</option>
            <option value='txt'>.txt</option>
            <option value='xml'>.xml</option>
            <option value='json'>.JSON</option>
          </select>
          <div className='input-group-append'>
            <button
              type='button'
              className='btn btn-sm btn-success'
              onClick={onClick}
              disabled={!fileType}>
              Download
            </button>
            <button type='button' className='btn btn-danger' onClick={clear}>
              Clear Data
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
