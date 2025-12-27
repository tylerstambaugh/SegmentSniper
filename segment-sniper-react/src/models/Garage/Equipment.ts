export type Equipment = {
  id: string;
  bikeId: string;
  userId: string;
  name: string;
  description?: string;
  milesLogged: number;
  installDate: Date;
  retiredDate: Date;
  price: number;
  replaceAtMiles: number;
  remindAtMiles: number;
};
