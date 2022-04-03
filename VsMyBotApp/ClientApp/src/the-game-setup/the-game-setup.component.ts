import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-the-game-setup',
  templateUrl: './the-game-setup.component.html',
  styleUrls: ['./the-game-setup.component.css']
})
export class TheGameSetupComponent implements OnInit {
  public gameSetupForm!: FormGroup;
  public Teams!:["Random", "Resitance", "Spies"];

  constructor() { }

  ngOnInit(): void {

    this.gameSetupForm = new FormGroup({
      botNumber: new FormControl('', [Validators.required]),
      playersTeam: new FormControl('', [Validators.required])
    });
  }

  public validateControl = (controlName: string) => {
    return this.gameSetupForm.controls[controlName].invalid &&
      this.gameSetupForm.controls[controlName].touched;
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.gameSetupForm.controls[controlName].hasError(errorName);
  }

  public setupNewGame = (gameSetupFormValue: any) => {
    const formValues = { ...gameSetupFormValue };
    console.log(formValues.botNumber);
    console.log(formValues.playersTeam);
  }
}
