import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { ClientsService } from '../../services/clients.service';
import { CountriesService } from '../../services/countries.service';
import { IbanService } from '../../services/iban.service'
import {
  MatSnackBar,
} from '@angular/material/snack-bar';



@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.scss']
})
export class ClientsFormComponent implements OnInit {

  form: FormGroup;
  client = null;
  editedClient: string = "";
  maxDate: Date;
  countries: string[];

  constructor(private route: ActivatedRoute, private location: Location, private clientsService: ClientsService, private countriesService:CountriesService, private ibanService: IbanService, private fb: FormBuilder,private _snackBar:MatSnackBar) {
    //extracting client id from route params
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.editedClient = params['id'];
      }


    });
  }

  ngOnInit(): void {
    
    //setting validations for form fields
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(10)]],
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      birthDate: [null, [Validators.required]],
      iban: [null, [Validators.required]],
      postCode: [null, [Validators.required]],
      city: [null, [Validators.required]],
      houseNr: [null, [Validators.required]],
      addition: [null, [Validators.required]],
      country: [null, [Validators.required]],
      gender: [null, [Validators.required]],
    });

    //setting max date so that users do not pick a date in future
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear - 1, 0, 1);

    //loading countries for countries drop down control
    this.countriesService.getCountries().subscribe((data)=>{
      this.countries=data.map(country=>country.name)
    })



    //loading edited client data using their id and pre-filling the client form with it
    this.clientsService.getClients().subscribe((data) => {
      this.client = data.find(client => client._id == this.editedClient);
      this.form.patchValue(this.client);
      
    });

    // this.ibanService.validateIban().subscribe(res=>{
    //   console.log(res)
    // })
  }



  cancelEdit() {
    this.location.back();
  }

  showErrorAlert(message: string) {
    this._snackBar.open(message, 'close', {
      verticalPosition: 'top',
      duration:3000,
    });
   }


  submitForm(form) {
    console.log(JSON.stringify(form.value, null, 4))
    this.showErrorAlert("Client Information successfully updated")

  }

}
