import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panelayudas',
  templateUrl: './panelayudas.component.html',
  styleUrls: ['./panelayudas.component.css']
})
export class PanelayudasComponent implements OnInit {

  constructor() { }

  Usuario= localStorage.getItem('Role')

  ngOnInit(): void {
  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  Administrador()
  {
    if(this.Usuario=="Administrador")
    {
      return true;
    }else

    return false;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
