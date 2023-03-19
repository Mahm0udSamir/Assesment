import { TimerComponent } from './components/timer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TimerComponent],
  imports: [CommonModule],
  exports: [TimerComponent],
  providers: [],
})
export class TimerModule {}
