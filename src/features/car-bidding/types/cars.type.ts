export interface IVehicle {
  id: string;
  vin: string;
  brand: string;
  name: string;
  price: number;
  imageUrl: string;
  status: string;
  description: string;
  color: string;
}
export interface IVehicleWithMetaData {
  items: IVehicle[];
  pageNumber: number;
  pageSize: number;
  totalCounts: number;
  totalItems: number;
}
