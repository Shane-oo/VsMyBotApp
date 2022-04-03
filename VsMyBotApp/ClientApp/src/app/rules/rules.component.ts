import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {
  cardNumber: number = 0;
  resCardNumber: number = 0;
  spyCardNumber: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  incrementCardNum() {
    this.cardNumber++;
  }
  deductCardNum() {
    this.cardNumber--;
  }
  incrementResCardNum() {
    this.resCardNumber++;
  }
  deductResCardNum() {
    this.resCardNumber--;
  }
  incrementSpyCardNum() {
    this.spyCardNumber++;
  }
  deductSpyCardNum() {
    this.spyCardNumber--;
  }
}
