import { useState } from 'react';
import './Filter.css';

function Filter() {
  const [file, setFile] = useState();
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="filter-view">
      <h2>Add Image:</h2>
      <input type="file" onChange={handleChange} />
      <br />
      <img
        src={file}
        alt="preview of your input file"
        className="filter-image"
      />

    </div>

  );
}

export default Filter;
