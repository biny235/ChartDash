import React from 'react';
import { Chart } from 'react-google-charts';

class Charts extends React.Component{
  constructor(){
    super()
    this.state = {
      states: {},
      ages: {},
      showForm: false
    }
    this.mostPopulusStates = this.mostPopulusStates.bind(this);
    this.mostPopulusStatesMale = this.mostPopulusStatesMale.bind(this)
    this.mostPopulusStatesFemale = this.mostPopulusStatesFemale.bind(this)
    this.ageBreakdown = this.ageBreakdown.bind(this);
  }
  componentDidMount(){
    const data = window.localStorage.getItem('data');
    this.setState(JSON.parse(data))
  }
  mostPopulusStates(){
    let { states } = this.state  
    let sortable = []
    Object.keys(states).forEach(state => sortable.push([state, (states[state].male + states[state].female)]))
    return sortable.sort((a, b)=> b[1] - a[1]).slice(0,10)
  }
  mostPopulusStatesMale(){
    let { states } = this.state  
    let sortable = []
    Object.keys(states).forEach(state => sortable.push([state, states[state].male]))
    return sortable.sort((a, b)=> b[1] - a[1]).slice(0,10)
  }
  mostPopulusStatesFemale(){
    let { states } = this.state  
    let sortable = []
    Object.keys(states).forEach(state => sortable.push([state, states[state].female]))
    return sortable.sort((a, b)=> b[1] - a[1]).slice(0,10)
  }

  ageBreakdown(){
    let {ages} = this.state;
    let arr = [];
    Object.keys(ages).forEach(range => arr.push([range, ages[range]]))
    return arr
  }

  render(){
    const {ageBreakdown, mostPopulusStates, mostPopulusStatesMale, mostPopulusStatesFemale} = this;
    return(
      <div className='chart-grid'>
        <div>
          <h2>Chart Dashboard</h2>
        </div>
        <div>
          <h2>Total People: {this.state.total}</h2>
        </div>
        <div>
          <div className='btn-group' >
            <button type='button' className='btn btn-success'>Download Data</button>
            <button type='button' className='btn btn-danger'>Clear</button>
          </div>
        </div>
        <Chart 
          chartType='PieChart'
          data={[['Gender', 'Total'], ['Male', this.state.male], ['Female', this.state.female]]}
          height='170px'
          options={{
            title: 'Male v. Female',
            pieHole: 0.2,
          }}
        />
        <Chart 
          chartType='PieChart'
          data={[['First Name', 'Total'], ['A-M', this.state.firstAM], ['N-Z', this.state.firstNZ]]}
          height='170px'
          options={{
            title: 'First Name A-M v. N-Z',
            pieHole: 0.2,
          }}
        />
        <Chart 
          chartType='PieChart'
          data={[['Last Name', 'Total'], ['A-M', this.state.lastAM], ['N-Z', this.state.lastNZ]]}
          height='170px'
          options={{
            title: 'Last Name A-M v. N-Z',
            pieHole: 0.2,
          }}
        />
        <Chart 
          chartType='ColumnChart'
          data={[['State', ''], ...mostPopulusStates()]}
          height='150px'
          options={{
            title: 'Most Populus States',
          }}
        />
        <Chart 
          chartType='ColumnChart'
          data={[['State', ''], ...mostPopulusStatesMale()]}
          height='150px'
          options={{
            title: 'Most Populus States Male',
          }}
        />
        <Chart 
          chartType='ColumnChart'
          data={[['State', ''], ...mostPopulusStatesFemale()]}
          height='150px'
          options={{
            title: 'Most Populus States Female',
          }}
        />
        <div className='ages-chart'>
          <Chart 
            chartType='ColumnChart'
            data={[['Age Range', 'Total'], ...ageBreakdown()]}
            height='170px'
            options={{
              title: 'Age Breakdown',
            }}
        />
        </div>
      </div>

    )

  }
}

export default Charts