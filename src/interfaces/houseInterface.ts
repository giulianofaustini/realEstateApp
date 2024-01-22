export interface HouseInterface {
  _id?: string;
  title: string;
  description: string;
  price: number;
  address: string;
  location?: string;
  imageUrl: string[];
  year: number;
  bedrooms: number;
  bathrooms: number;
  addedBy?: string;
  userEmail?: string;
  userId?: string;
  status: string;
}


