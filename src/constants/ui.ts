import { VehicleStatus } from "../features/car-bidding/types/cars.type";

export const CarImageList = ["/car-images/car1.jpg", "/car-images/car2.jpg", "/car-images/car3.jpg", "/car-images/car4.jpg", "/car-images/car5.jpg"];
export class GlobalFilter {
  static readonly DEFAULT_PAGE_SIZE = 10;
  static readonly DEFAULT_TOTAL_ITEM = 0;
  static readonly DEFAULT_PAGE_NUMBER = 1;
}
export const statusMapping: Record<VehicleStatus | "Default", string> = {
  Available: "green",
  Sold: "yellow",
  InBidding: "teal",
  UnAvailable: "gray",
  Default: "blue",
};
