/* eslint-disable react/prop-types */
import './FiltersSpan.css';

function FiltersSpan(props) {
  const { filterChange } = props;
  return (
    <div className="filters-span">
      {'Choose filter: '}
      <select name="filter" className="filter-select" onChange={filterChange} defaultValue={undefined}>
        <option hidden value={undefined}> -- select an option -- </option>
        <option value="gauss1Filter">Gauss 1</option>
        <option value="gauss2Filter">Gaauss 2</option>
        <option value="gauss3Filter">Gauss 3</option>
      </select>
    </div>
  );
}
export default FiltersSpan;
