import React from 'react';
import { Chart } from "react-google-charts";

class Charts extends React.Component{
  constructor(){
    super()

    this.state = {}
  }
  componentDidMount(){
    const data = window.localStorage.getItem('data');
    this.setState(JSON.parse(data))
  }


  render(){
    return(
      <div className="chart-grid">
        <Chart 
          chartType="PieChart"
          data={[["Gender", "Total"], ["Male", this.state.male], ["Female", this.state.female]]}
          height="400px"
          options={{
            title: "Male v. Female",
            pieHole: 0.4,
          }}
        />
        <Chart 
          chartType="PieChart"
          data={[["First Name", "Total"], ["First Name A-M", this.state.firstAM], ["First Name N-Z", this.state.firstNZ]]}
          height="400px"
          options={{
            title: "First Name A-M v. N-Z",
            pieHole: 0.4,
          }}
        />
        <Chart 
          chartType="PieChart"
          data={[["Last Name", "Total"], ["Last Name A-M", this.state.lastAM], ["Last Name N-Z", this.state.lastNZ]]}
          height="400px"
          options={{
            title: "Last Name A-M v. N-Z",
            pieHole: 0.4,
          }}
        />
      </div>

    )

  }
}

export default Charts