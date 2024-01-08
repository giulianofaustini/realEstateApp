export interface HouseInterface {
  _id?: string;
  title: string;
  description: string;
  price: number;
  address: string;
  location: string;
  imageUrl: string;
  agent: string;
  bedrooms: number;
  bathrooms: number;
  addedBy?: string;
}


