import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorLayoutComponent } from './calculator-layout.component';
import { MatGridListModule, MatDividerModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { CalculatorModule } from '../calculator/calculator.module';
import { CalculatorHistoryModule } from '../calculator-history/calculator-history.module';
import { CalculatorService } from '../calculator/calculator.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [CalculatorLayoutComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    MatDividerModule,
    FlexLayoutModule,
    FormsModule,
    CalculatorModule,
    CalculatorHistoryModule,
  ],
  providers: [
    CalculatorService
  ]
})
export class CalculatorLayoutModule { }
