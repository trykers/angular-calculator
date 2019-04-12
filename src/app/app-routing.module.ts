import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculatorLayoutComponent } from './calculator-layout/calculator-layout.component';

const routes: Routes = [
  { path: '', component: CalculatorLayoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
