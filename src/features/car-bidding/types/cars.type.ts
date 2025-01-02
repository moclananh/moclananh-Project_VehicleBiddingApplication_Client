export interface IVehicle {
  id: string;
  vin: string;
  brands: string;
  name: string;
  price: number;
  imageUrl: string;
  status: string;
  description: string;
  color: string;
  numberOfChairs: number;
  horsepower: number;
  maximumSpeed: number;
  trunkCapacity: number;
}
export interface IVehicleWithMetaData {
  items: IVehicle[];
  pageNumber: number;
  pageSize: number;
  totalCounts: number;
  totalItems: number;
}
