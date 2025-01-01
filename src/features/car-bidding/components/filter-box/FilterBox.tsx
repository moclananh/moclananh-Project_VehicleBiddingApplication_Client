export interface IFilter {
  name: string | null;
  brands: string | null;
  vin: string | null;
  color: string | null;
  status: string | null;
  pageNumber: number | null;
  pageSize: number | null;
}

const FilterBox = () => {
  return <div>FilterBox</div>;
};

export default FilterBox;
