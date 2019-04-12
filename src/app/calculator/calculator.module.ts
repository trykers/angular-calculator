import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatGridListModule } from '@angular/material';
import { CalculatorComponent } from './calculator.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CalculatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatGridListModule,
  ],
  exports: [
    CalculatorComponent,
  ]
})
export class CalculatorModule { }
