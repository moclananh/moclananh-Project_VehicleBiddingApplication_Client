import { ComboboxItem } from "@mantine/core";
import { IFilter } from "../features/car-bidding/components/filter-box/VehicleFilter";
import { VehicleStatus } from "../features/car-bidding/types/cars.type";

export const CarImageList = ["/car-images/car1.jpg", "/car-images/car2.jpg", "/car-images/car3.jpg", "/car-images/car4.jpg", "/car-images/car5.jpg"];
export class GlobalFilter {
  static readonly DEFAULT_PAGE_SIZE = 12;
  static readonly DEFAULT_TOTAL_ITEM = 0;
  static readonly DEFAULT_PAGE_NUMBER = 1;
  static readonly DEFAULT_FILTER: IFilter = {
    name: null,
    brands: null,
    vin: null,
    color: null,
    status: null,
    pageNumber: GlobalFilter.DEFAULT_PAGE_NUMBER,
    pageSize: GlobalFilter.DEFAULT_PAGE_SIZE,
  };
}
export const statusMapping: Record<VehicleStatus | "Default", string> = {
  Available: "green",
  Sold: "yellow",
  InBidding: "teal",
  UnAvailable: "gray",
  Default: "blue",
};

export enum Brands {
  BMW = "BMW",
  RollsRoyce = "RollsRoyce",
  Nissan = "Nissan",
  Honda = "Honda",
}
export const brandOptions: ComboboxItem[] = Object.values(Brands).map((brand) => ({
  label: brand,
  value: brand,
}));
export const statusOptions: ComboboxItem[] = Object.values(VehicleStatus).map((brand) => ({
  label: brand,
  value: brand,
}));
