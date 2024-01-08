export interface housesForRentInterface {
  _id?: string;
  title: string;
  description: string;
  monthlyRent: number;
  rentalDeposit: number;
  address: string;
  location: string;
  imageUrl: string;
  agent: string;
  bedrooms: number;
  bathrooms: number;
  addedBy?: string;
}
