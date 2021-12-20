import { Component, OnInit, AfterViewInit,ViewChild } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
//import {ClientsFormComponent} from '../clients-form/clients-form.component';
import { Router} from '@angular/router';
import {ClientsService} from '../../services/clients.service';;
import {Client} from '../../models/client.model';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'gender','birthDate','iban','email','address','actions'];
  clientList : Client[] = [];
  isLoading: boolean = true;
  dataSource = new MatTableDataSource<Client>(this.clientList);
  
  constructor(private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog,private readonly clientService: ClientsService,private _snackBar: MatSnackBar,private router:Router) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.clientService.getClients().subscribe((data)=>{
      this.isLoading = false;
      this.clientList = [...data];
      this.dataSource = new MatTableDataSource<Client>(this.clientList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, error => this.isLoading = false);

    
  }

  editClient(id){
    //console.log(id)
    this.router.navigate(["clients/edit"],{ queryParams: { id: id } });
  }

 


 

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
 
   /** Announce the change in sort state for assistive technology. */
   announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }




}
