import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { ClientsFormComponent } from './components/clients-form/clients-form.component';
import {NgMaterialModule} from '../ng-material/ng-material.module'
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [ClientsListComponent, ClientsFormComponent],
  imports: [
    CommonModule,
    NgMaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  exports:[ClientsListComponent,ClientsFormComponent]
})
export class ClientsModule { }
