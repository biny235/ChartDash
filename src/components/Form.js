import React from 'react';
import axios from 'axios';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      showFile: true,
      fileName: '',
      validJSON: true,
      isJSONFile: false,
      file: '',
      JSONData: {},
      loading: false,
      error: ''
    };
    this.onClick = this.onClick.bind(this);
    this.selectFile = this.selectFile.bind(this);
    this.checkJSON = this.checkJSON.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onClick() {
    this.setState({ showFile: !this.state.showFile });
  }
  selectFile(ev) {
    const file = ev.target.files[0];
    const fileName = file.name;
    const isJSONFile = file.type === 'application/json';
    this.setState({ fileName, isJSONFile, file });
  }
  checkJSON(ev) {
    let JSONData;
    try {
      JSONData = JSON.parse(ev.target.value);
    } catch (e) {
      return this.setState({ error: "invalid JSON", validJSON: false });
    }
    this.setState({ validJSON: true, JSONData, error: '' });
  }

  onSubmit(ev) {
    ev.preventDefault();
    this.setState({ loading: true });
    const { showFile, file, JSONData } = this.state;
    //add the file information to FormData to send
    let formData = new FormData();
    if (showFile && file) {
      formData.append('file', file);
    } else {
      formData = JSONData;
    }
    axios
      .post(`/api/analyze/${showFile ? 'file' : 'JSON'}`, formData)
      .then(res => res.data)
      .then(data => {
        window.localStorage.setItem('data', JSON.stringify(data));
        this.props.history.push('/charts');
      })
      .catch(error => {
        this.setState({error, loading:false})
      })
  }

  render() {
    const { showFile, fileName, validJSON, isJSONFile, loading, error } = this.state;
    const { onClick, selectFile, checkJSON, onSubmit } = this;
    return (
      <div>
        <h1>Analyze Data</h1>
        <div className='jumbotron'>
          <form className='form-group' onSubmit={onSubmit}>
            <div className='btn-group form-row' role='group'>
              <button
                type='button'
                className='btn btn-primary'
                disabled={showFile}
                onClick={onClick}>
                File
              </button>
              <button
                type='button'
                className='btn btn-primary'
                disabled={!showFile}
                onClick={onClick}>
                JSON
              </button>
            </div>
            <div className='form-row'>
              {showFile ? (
                <div className='custom-file'>
                  <input
                    type='file'
                    className='custom-file-input'
                    id='validatedCustomFile'
                    required
                    onChange={selectFile}
                  />
                  <label className='custom-file-label'>
                    {fileName || 'Choose file...'}
                  </label>
                </div>
              ) : (
                <textarea className={`form-control`} onChange={checkJSON} />
              )}
            </div>
            <div className='form-row'>
              <button
                className='btn btn-success'
                disabled={
                  (!showFile && !validJSON) ||
                  (showFile && (!fileName && !isJSONFile)) ||
                  loading
                }>
                Submit
              </button>
              {loading ? ' Loading...' : ''}
            </div>
          </form>
          {error ? <span className='alert alert-danger'> {error} </span> : ''}
        </div>
      </div>
    );
  }
}

export default Form;
