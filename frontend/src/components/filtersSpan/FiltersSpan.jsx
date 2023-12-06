/* eslint-disable react/prop-types */
import './FiltersSpan.css';

function FiltersSpan(props) {
  const { filterChange } = props;
  return (
    <div className="filters-span">
      {'Choose filter: '}
      <select name="filter" className="filter-select" onChange={filterChange} defaultValue={undefined}>
        <option hidden value={undefined}> -- select an option -- </option>
        <option value="blurrFilter">Averaging</option>
        <option value="gauss1Filter">Gauss 1</option>
        <option value="gauss3Filter">Gaauss 2</option>
        <option value="gauss5Filter">Gauss 3</option>
        <option value="median">Median</option>
        <option value="bayess">Bayess</option>
        <option value="meanRemovalFilter">High Pass 1</option>
        <option value="hp2Filter">High Pass 2</option>
        <option value="hp3Filter">High Pass 3</option>
        <option value="lapl1Filter">Laplace 1</option>
        <option value="lapl2Filter">Laplace 2</option>
        <option value="lapl3Filter">Laplace 3</option>
        <option value="lapldiagFilter">Laplace 4</option>
        <option value="southFilter">Embossing southern</option>
        <option value="westFilter">Embossing western</option>
        <option value="northFilter">Embossing northern</option>
        <option value="eastFilter">Embossing eastern</option>
        <option value="horizontalSobelFilter">Sobel horizontal</option>
        <option value="verticalSobelFilter">Sobel vertical</option>
        <option value="horizontalPrewittFilter">Prewitt horizontal</option>
        <option value="verticalPrewittFilter">Prewitt vertical</option>
      </select>
    </div>
  );
}
export default FiltersSpan;
