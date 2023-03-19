import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AssesmentComponent } from './components/assesment/assesment.component';
import { GetAssesmentsService } from './services/getAssesments.service';
import { TrainingDevelopmentRoutingModule } from './training-development.routng.module';
import { ModalModule } from './../shared/modules/modal/modal.module';
import { TimerModule } from './../shared/modules/timer/timer.module';
import { ProgressBarModule } from './../shared/modules/progressbar/progressbar.module';

@NgModule({
  declarations: [AssesmentComponent],
  imports: [
    CommonModule,
    TrainingDevelopmentRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ProgressBarModule,
    TimerModule,
    ModalModule,
  ],
  providers: [GetAssesmentsService],
})
export class TrainingDevelopmentModule {}
