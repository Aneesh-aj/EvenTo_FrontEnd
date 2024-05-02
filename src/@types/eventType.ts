


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