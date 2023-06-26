import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TramosComponent } from './components/tramos/tramos.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { TopComponent } from './components/top/top.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "tramos", component: TramosComponent },
  { path: "cliente", component: ClienteComponent },
  { path: "top", component: TopComponent },
  { path: "**", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
