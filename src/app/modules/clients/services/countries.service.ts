import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap,filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  countriesList$ = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {}

  //get all countries from json file
  getCountries() {
    return this.http.get<any>('../../../../assets/countries.json').pipe(
      tap((response) => {
          this.countriesList$.next(response);
      })
    );
  }

}