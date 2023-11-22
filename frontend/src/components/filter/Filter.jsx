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
    try {
      const res = await fetch(`${serverUrl.url}/filter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'filter-name': filter,
          type: file.type,
          user: 'dummyUser', // <-- change dummyUser
          'file-base64': fileBase64,
        }),
      });
      if (res.status === 200) {
        const res2 = await fetch(`${serverUrl.url}/filter/?username=${'dummyUser'}&type=${file.type}`, { // <-- change dummyUser
          method: 'GET',
        });
        const output = await res2.json();
        setOutputBase64Url(`data:${file.type};base64,${output}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="filter-view">
      <h2>Add Image:</h2>
      <input type="file" onChange={handleFileChange} />
      <br />
      <FiltersSpan filterChange={handleFilterChange} />
      <br />
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
