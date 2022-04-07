import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panelayudas',
  templateUrl: './panelayudas.component.html',
  styleUrls: ['./panelayudas.component.css']
})
export class PanelayudasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
