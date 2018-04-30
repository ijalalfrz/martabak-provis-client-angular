import { isDevMode } from '@angular/core';
export const BASE_API = () =>{
  if(isDevMode()){
    return "http://localhost:13544/api";
  }else{
    return "http://www.example.com/api";

  }
}
