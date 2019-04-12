import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorHistoryComponent } from './calculator-history.component';
import { MatListModule, MatDividerModule, MatButtonModule, MatButton } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CalculatorHistoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
  ],
  exports: [
    CalculatorHistoryComponent,
  ]
})
export class CalculatorHistoryModule { }
