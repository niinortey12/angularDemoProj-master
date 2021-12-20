import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IBAN_API,IBAN_API_KEY } from '../../../configs';

@Injectable({
  providedIn: 'root'
})
export class IbanService {

  constructor(private http:HttpClient) { }

  //validateIban(control: FormControl){
    validateIban(){
      //let ibanval = control.value;
      let ibanval = "NL13ABNA6519574414";
      return this.http.get(`${IBAN_API}/validate/${ibanval}?api_key=${IBAN_API_KEY}`)

    
  }
}
