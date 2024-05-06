export interface Icountry {
    isoCode: string;
    name: string;
  }
  
 export interface Istate {
    isoCode: string;
    name: string;
  }
  
export  interface Icity {
    name: string;
  }

export interface currentUser{
   user: any;
   role:string,
   name:string,
   email:string,
   id:string,
   blocked:boolean,
   approve?:boolean,
}