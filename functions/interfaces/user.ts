export interface User {
  uid: string;
  name: string;
  photoUrl: string;
  isAdmin: boolean;
  email: string;
  searchHistory?: any;
}
