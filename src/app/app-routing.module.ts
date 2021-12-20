import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsListComponent } from './modules/clients/components/clients-list/clients-list.component';
import { ClientsFormComponent } from './modules/clients/components/clients-form/clients-form.component';


const routes: Routes = [
  {
    path: 'clients', component: ClientsListComponent
  },
  { path: 'clients/edit', component: ClientsFormComponent },
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  // { path: '**', component: ClientsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
