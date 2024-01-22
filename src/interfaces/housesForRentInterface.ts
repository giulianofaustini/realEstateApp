

export interface housesForRentInterface {
  _id?: string;
  title: string;
  description: string;
  monthlyRent: number;
  rentalDeposit: number;
  address: string;
  location?: string;
  imageUrl: string[];
  year: number;
  bedrooms: number;
  bathrooms: number;
  addedBy?: string;
  userEmail?: string;
  userId?: string;
  status?: string;
}
