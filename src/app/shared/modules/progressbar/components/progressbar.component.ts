import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  @Input('prograss') prograss: number;
  constructor() {}

  ngOnInit(): void {}
}
