import { LoadingService } from './../../../shared/modules/loading/services/loading.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  UntypedFormBuilder,
} from '@angular/forms';
import { GetAssesmentsService } from './../../services/getAssesments.service';
import { Assesment } from './../../types/assesment.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assesment',
  templateUrl: './assesment.component.html',
  styleUrls: ['./assesment.component.scss'],
})
export class AssesmentComponent implements OnInit {
  assesments$: Observable<Assesment[]>;
  questionsForm: FormGroup;
  currentPage: number = 1;
  numberOfRows: number = 10;
  numberOfQuestionAnswerd = [];
  prograss;
  numberOfQuestins: number;
  message = '';
  showModal = false;

  constructor(
    private fb: UntypedFormBuilder,
    public getAssesmentsService: GetAssesmentsService,
    private loading: LoadingService,
    private router: Router
  ) {
    this.assesments$ = this.getAssesmentsService.getAllAssesments();
  }

  ngOnInit(): void {
    // .subscribe((data) => console.log(data));
    this.initializeValues();
    this.initializeForm();
  }

  initializeValues(): void {
    this.loading
      .showLoaderUntilCompleted(this.assesments$)
      .subscribe((assesments: Assesment[]) => {
        this.numberOfQuestins = assesments.length;
        assesments.map(() => {
          this.addQuestion();
        });
      });
  }

  initializeForm(): void {
    this.questionsForm = this.fb.group({
      questions: this.fb.array([]),
    });
  }

  get questions(): FormArray {
    return this.questionsForm.get('questions') as FormArray;
  }

  newQuestion(): FormGroup {
    return this.fb.group({
      question: '',
    });
  }

  addQuestion(): void {
    this.questions.push(this.newQuestion());
  }

  onSubmit(assesments: Assesment[]): void {
    this.showModal = true;
    const { questions } = this.questionsForm.value;
    const solvedTrue = questions?.filter(
      (item: Assesment, i: number) =>
        typeof item.question === 'boolean' &&
        item.question === assesments[i].rightAnswer
    );

    this.message = `You solved ${solvedTrue?.length} TRUE form ${assesments.length} Questions`;
  }

  nextPage(): void {
    this.currentPage++;
  }
  previousPage(): void {
    this.currentPage--;
  }

  handleInputChange(index: number): void {
    this.numberOfQuestionAnswerd.push(index);
    this.numberOfQuestionAnswerd = Array.from(
      new Set(this.numberOfQuestionAnswerd)
    );

    this.prograss = Math.ceil(
      (this.numberOfQuestionAnswerd.length / this.numberOfQuestins) * 100
    );
  }

  onDismissModalHandler(event: any): void {
    console.log(event);
    this.showModal = false;
    this.router.navigateByUrl('/');
  }

  onTimerStopedHandler(event: any): void {
    console.log(event);
    this.showModal = true;
    this.message = 'The time is up try again';
  }
}
