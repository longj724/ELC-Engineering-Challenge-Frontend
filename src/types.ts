export interface FoodTruckCSVData {
  locationId: string;
  applicant: string;
  facilityType: string;
  cnn: number;
  locationDescription: string;
  address: string;
  blocklot: number;
  block: number;
  lot: number;
  permit: string;
  status: string;
  foodItems: string;
  x: number;
  y: number;
  latitude: number;
  longitude: number;
  schedule: string;
  dayshours: string;
  noisent: string;
  approved: string;
  received: Date;
  priorPermit: string;
  expirationDate: Date;
  location: string;
}

export interface TruckData {
  locationid: string;
  facilityType: string;
  locationDescription: string;
  address: string;
  latitude: string;
  longitude: string;
  foodItems: string;
  schedule: string;
}

export interface MarkerRef {
  [key: number]: HTMLDivElement;
}
