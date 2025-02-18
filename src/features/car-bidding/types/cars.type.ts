import { WithMetaData } from "../../../types/api-response";

export interface IVehicle {
  id: string;
  vin: string;
  brands: string;
  name: string;
  price: number;
  imageUrl: string;
  status: VehicleStatus;
  description: string;
  color: string;
  numberOfChairs: number;
  horsepower: number;
  maximumSpeed: number;
  trunkCapacity: number;
}
export interface IVehicleFilter {
  name: string | null;
  brand: string | null;
  vin: string | null;
  color: string | null;
  status: string | null;
  pageNumber: number | null;
  pageSize: number | null;
}
export type IVehicleWithMetaData = WithMetaData<IVehicle>;
export enum VehicleStatus {
  Available = "Available",
  Sold = "Sold",
  InBidding = "InBidding",
  Unavailable = "UnAvailable",
}
export interface ICreateVehicle {
  vin: string;
  brand: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  color: string;
  numberOfChairs: number;
  horsepower: number;
  maximumSpeed: number;
  trunkCapacity: number;
}
export enum VehicleBrands {
  BMW,
  RollsRoyce,
  Nissan,
  Honda,
}
export enum VehicleColors {
  White,
  Black,
  Gray,
  Red,
  Blue,
}
