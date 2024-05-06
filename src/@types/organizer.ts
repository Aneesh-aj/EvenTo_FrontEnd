export interface IorganizerFormData{
    name:string,
    email:string,
    phoneNumber:string,
    password:string,
    confirm_password:string,
    building:string,
    pincode:string,
    country:string,
    state:string,
    city:string,
    otp:string,
    ownerId:string,
    companyLicense:string,
    companyInsurance:string,
    bankPassbook:string

}


export interface Iorganizer {
    _id?:string,
    role?:string,
    name: string,
    email: string,
    phoneNumber: string,
    password: string,
    ownerId: any,
    companyLicense: any,
    companyInsurance: any,
    bankPassbook: any,
    approved?:boolean,
    blocked?:boolean,
    backgroundImage?:string,
    profileImage?:string,
    about?:string,
    eventCategory?:[],
}
