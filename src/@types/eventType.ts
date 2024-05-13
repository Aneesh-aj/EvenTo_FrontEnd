


export interface IeventCategory{
    id?:string,
    category:string,
    delete:boolean,
    active:boolean,
}

export interface eventFormData{

    name:string,
    organizerId:string,
    eventCategory:IeventCategory[],
    eventCountry:string,
    eventState:string,
    eventCity:string,
    location:string,
    eventType:string,
    paymentMethod:string,
    paymentAmount?:string,
    email:string,
     country:string,
    state:string,
    city:string,
    phoneNumber:string,
    startingTime:object,
      endingTime:object,
    date:object,
    seatArrangment?:[],
    seatNumber?:number
     
}

export interface Ievents{

  name:string,
  organizerId:string,
  eventCategory:{
     category:string,
     delete:boolean,
     active:boolean
  },
  eventCountry:string,
  eventState:string,
  eventCity:string,
  location:string,
  eventType:string,
  paymentMethod:string,
  paymentAmount?:string,
  email:string,
   country:string,
  state:string,
  city:string,
  phoneNumber:string,
  startingTime:string,
    endingTime:string,
  date:string,
  seatArrangement?:[],
  seatNumber?:number
  status:string,
  totalAmount:number,
  paymentStatus:boolean,
  eventBooking:string

   

}



export interface IeventPost{
  eventId:string,
  organizerId:string,
  image:string,
  about:string,
  title:string,
  subTitle:string,
  seatArrangment:[],
  entryFormId:string
}

export interface Seat {
  row: string;
  column: number;
  booked: boolean;
  selected: boolean;
  userSelected: boolean;
  isSelected:boolean
  userId: string,
}