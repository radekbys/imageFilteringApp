/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import './Filter.css';
import FiltersSpan from '../filtersSpan/FiltersSpan';
import serverUrl from '../../serverURL.json';

function Filter() {
  const [file, setFile] = useState(undefined);
  const [fileBase64, setFileBase64] = useState(undefined);
  const [filter, setFilter] = useState(undefined);
  const [outputBase64Url, setOutputBase64Url] = useState(undefined);
  const [epsilonParameter, setEpsilonParameter] = useState(1); // user defined parameter used by the bayessian filter

  const changeEpsilon = (e) => {
    setEpsilonParameter(e.target.value);
  };

  // function for encoding uploaded image to base 64
  const encodeFileBase64 = (encodedFile) => {
    const reader = new FileReader();
    if (!encodedFile) return;
    reader.readAsDataURL(encodedFile);
    reader.onload = () => {
      const Base64 = reader.result.split(',')[1];
      setFileBase64(Base64);
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  };

  // on new file set file
  function handleFileChange(e) {
    if (e.target.files) setFile(e.target.files[0]);
  }
  // when file is changed encode it
  useEffect(() => {
    if (!file) return;
    encodeFileBase64(file);
  }, [file]);

  // when filter selected set it
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // when file or filter change and both are selected send file for filtration
  // in next step get filtered image and set it as outputBase64
  const filterAndRetriveImage = async (event) => {
    event.preventDefault();
    const res = await fetch(`${serverUrl.url}/filter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'filter-name': filter,
        type: file.type,
        user: 'dummyUser', // <-- change dummyUser
        epsilon: epsilonParameter,
        'file-base64': fileBase64,
      }),
    });
    if (res.status !== 200) {
      console.log(await res.json());
      return;
    }
    const res2 = await fetch(`${serverUrl.url}/filter/?username=${'dummyUser'}&type=${file.type}`, { // <-- change dummyUser
      method: 'GET',
    });
    if (res2.status !== 200) {
      console.log(await res.json());
      return;
    }
    const output = await res2.json();
    setOutputBase64Url(`data:${file.type};base64,${output}`);
    const res3 = await fetch(`${serverUrl.url}/filter`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: file.type,
        username: 'dummyUser', // <-- change dummyUser
      }),
    });
    if (res3.status !== 200) {
      console.log(await res.json());
    }
  };

  return (
    <div className="filter-view">
      <h2>Add Image:</h2>
      <input type="file" onChange={handleFileChange} />
      <br />
      <FiltersSpan filterChange={handleFilterChange} />
      <br />
      {(filter === 'bayess') && (
      <div className="epsilon-div">
        <h2 className="epsilon-header">Set the epsilon parameter:</h2>
        <input type="number" value={epsilonParameter} onChange={changeEpsilon} />
      </div>
      )}
      <button
        type="button"
        onClick={filterAndRetriveImage}
      >
        send file for filtration
      </button>
      {file && (
        <div>
          <h2 className="filter-image-title">Input Image:</h2>
          <img
            src={URL.createObjectURL(file)}
            alt="preview of your input file"
            className="filter-image"
          />
        </div>
      )}
      {outputBase64Url && (
        <div>
          <h2 className="filter-image-title">Output image:</h2>
          <img
            src={outputBase64Url}
            alt="preview of output"
            className="filter-image"
          />
        </div>
      )}

    </div>

  );
}

export default Filter;
