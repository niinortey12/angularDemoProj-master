import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '.././models/client.model';
import { tap,filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  clientList$ = new BehaviorSubject<Client[]>([]);

  constructor(private http: HttpClient) {}

  //get all clients from json file
  getClients() {
    return this.http.get<any>('../../../../assets/clients-large.json').pipe(
      tap((response) => {
        response = this.adjustAddress(response);
          this.clientList$.next(response);
      })
    );
  }



  private adjustAddress(responseClientList: Client[]) {
    responseClientList.forEach((client) => {
      client.address =
        client.houseNr +
        '-' +
        client.addition +
        ',' +
        client.street +
        ',' +
        client.city +
        ' ' +
        client.country;
    });
    return responseClientList;
  }
}