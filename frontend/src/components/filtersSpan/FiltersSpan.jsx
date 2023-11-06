/* eslint-disable react/prop-types */
function FiltersSpan(props) {
  const { handleFilterChange } = props;
  return (
    <div>
      {'Choose filter: '}
      <select name="filter" className="filter-select" onChange={handleFilterChange}>
        <option value="gauss1Filter">Gauss 1</option>
        <option value="gauss2Filter">Gaauss 2</option>
        <option value="gauss3Filter">Gauss 3</option>
      </select>
    </div>
  );
}
export default FiltersSpan;
