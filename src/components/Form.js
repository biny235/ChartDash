import React from 'react';
import axios from 'axios';

class Form extends React.Component{
  constructor(){
    super();
    this.state = {
      showFile: true,
      fileName: '',
      validJSON: true,
      fileType: false
    }
    this.onClick = this.onClick.bind(this)
    this.selectFile = this.selectFile.bind(this)
    this.checkJSON = this.checkJSON.bind(this)
  }

  onClick(){
    const showFile = !this.state.showFile
    this.setState({showFile})
  }
  selectFile(ev){
    const file = ev.target.files[0]
    const fileName = file.name
    const fileType = file.type === 'application/json'
    this.setState({fileName, fileType})

  }
  checkJSON(ev){
    try {
      JSON.parse(ev.target.value);
    } catch (e) {
      console.log('in Here')
      return this.setState({validJSON: false});
    }
    this.setState({validJSON: true})
  }
  onSubmit(ev){
    ev.preventDefault();
    axios.post('/api/analyze')
  }

  render(){
    const {showFile, fileName, validJSON, fileType} = this.state;
    const {onClick, selectFile, checkJSON, onSubmit} = this;
    return (
      <form className='form-group' onSubmit={onSubmit}>
        <div className='btn-group form-row' role='group'>
          <button type='button' className='btn btn-primary' disabled={showFile} onClick={onClick}>File</button>
          <button type='button' className='btn btn-primary' disabled={!showFile} onClick={onClick}>JSON</button>
        </div>
        <div className='form-row'>
          {showFile? (
            <div className='custom-file'>
              <input type='file' className='custom-file-input' id='validatedCustomFile' required onChange={selectFile}/>
              <label className='custom-file-label'>{fileName || 'Choose file...'}</label>
            </div>
          )
          :
          (<textarea className={`form-control`} onChange={checkJSON} />)
          }
        </div>
        <div className='form-row'>
          <button className='btn btn-success' disabled={!showFile && !validJSON || showFile && (!fileName && !fileType)}>Submit</button>
          
        </div>
      </form>

    )
  }
}

export default Form;