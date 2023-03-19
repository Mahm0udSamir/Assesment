import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements AfterViewInit, OnInit {
  @ViewChild('time', { static: true }) time: ElementRef;
  @Output('onTimerStoped') onTimerStoped = new EventEmitter<boolean>();
  @Input() minutes = 1;
  @Input() hours = 0;
  seconds = 0;
  interval = null;

  constructor() {}
  ngOnInit(): void {
    this.startTimer();
  }

  ngAfterViewInit() {}

  startTimer() {
    if (this.interval !== null) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      this.displayTimer();
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
    console.log('pauseTimer');
  }

  resetTimer() {
    clearInterval(this.interval);
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    console.log('resetTimer');
    this.time.nativeElement.innerText = `00:00:00`;
    this.onTimerStoped.emit(true);
  }

  displayTimer() {
    if (this.hours === 0 && this.minutes === 0 && this.seconds === 0) {
      this.resetTimer();
      return;
    }
    this.seconds--;
    if (this.seconds < 0) {
      this.seconds = 59;
      this.minutes--;
      if (this.minutes < 0) {
        this.minutes = 59;
        this.hours--;
      }
    }

    let h = this.hours < 10 ? '0' + this.hours : this.hours;
    let m = this.minutes < 10 ? '0' + this.minutes : this.minutes;
    let s = this.seconds < 10 ? '0' + this.seconds : this.seconds;
    this.time.nativeElement.innerText = `${h}:${m}:${s}`;
    // console.log(` ${h} : ${m} : ${s}`);
  }

  get currentTime(): string {
    const now = new Intl.DateTimeFormat('default', {
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date());
    return now.toString();
  }
}
