import { useState } from 'react';
import './Filter.css';
import FiltersSpan from '../filtersSpan/FiltersSpan';

function Filter() {
  const [file, setFile] = useState();
  const [filter, setFilter] = useState();

  function handleFileChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  function handleFilterChange(e) {
    setFilter(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(file, filter);
  }

  return (
    <div className="filter-view">
      <h2>Add Image:</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <br />
        <FiltersSpan handleFilterChange />
        <br />
        <button className="filter-view-button" type="submit">filter the image</button>
      </form>
      <img
        src={file}
        alt="preview of your input file"
        className="filter-image"
      />

    </div>

  );
}

export default Filter;
