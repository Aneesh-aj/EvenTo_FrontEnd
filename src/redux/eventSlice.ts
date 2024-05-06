import { createSlice } from "@reduxjs/toolkit";
import { eventFormData } from "../@types/eventType";

const initialState : eventFormData={
    name:"",
    organizerId:"",
    eventCategory:[],
    eventCountry:"",
    eventState:"",
    eventCity:"",
    location:"",
    eventType:"",
    paymentMethod:"",
    paymentAmount:"",
    email:"",
     country:"",
    state:"",
    city:"",
    phoneNumber:"",
    startingTime:{},
      endingTime:{},
    date:{},
    seatArrangment:[],
    seatNumber:0
}

const eventSlice = createSlice({
    name:'event',
    initialState,
    reducers:{
        setEvent:(states,action)=>{
            const {name,organizerId,eventCategory,eventCountry,eventState,eventCity,location,eventType,paymentAmount,paymentMethod,email,phoneNumber,country,state,city,startingTime,endingTime,date,seatArrangment,seatNumber} = action.payload
             states.name = name;
             states.organizerId = organizerId;
             states.eventCategory = eventCategory;
             states.eventCountry= eventCountry;
             states.eventState = eventState;
             states.eventCity = eventCity;
             states.location = location;
             states.eventType = eventType;
             states.paymentAmount = paymentAmount;
             states.paymentMethod = paymentMethod;
             states.email = email;
             states.phoneNumber = phoneNumber;
             states.state = state
             states.country = country;
             states.city = city;
             states.startingTime = startingTime;
             states.endingTime = endingTime;
             states.date = date;
             states.seatArrangment = seatArrangment;
             states.seatNumber = seatNumber
        },
        removeEvent:(states)=>{
             states.name = "";
             states.organizerId = "";
             states.eventCategory = [];
             states.eventCountry= "";
             states.eventState = "";
             states.eventCity = "";
             states.location = "";
             states.eventType = "";
             states.paymentAmount = "";
             states.paymentMethod = "";
             states.email = "";
             states.phoneNumber = "";
             states.state = ""
             states.country = "";
             states.city = "";
             states.startingTime = {};
             states.endingTime = {};
             states.date ={};
             states.seatArrangment = [];
             states.seatNumber = 0
        }
    }
})

export const {setEvent,removeEvent} = eventSlice.actions
export default eventSlice.reducer