import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayerPiece } from '../app/_interfaces/the-game/playerpiece.model';
import { TheGameService } from '../shared/services/the-game.service';

@Component({
  selector: 'app-the-game-setup',
  templateUrl: './the-game-setup.component.html',
  styleUrls: ['./the-game-setup.component.css']
})
export class TheGameSetupComponent implements OnInit {
  public gameSetupForm!: FormGroup;
  public Teams:string[]= ["Random", "Resitance", "Spies"];
  public gameStarted!: boolean;
  public playerData: PlayerPiece[]=[];
  public spyNumber: number = 0;
  public resistanceNumber: number = 0;
  public existingTurnOrders: number[] = [];
  public playersObj!: PlayerPiece;
  public randomNames:string[]= ["Shane", "Chloe", "Hamish", "Ciaran", "Brandon", "Geemal", "Maya", "Natalie", "Jaeley"];
  constructor(private _gameService: TheGameService) { }

  ngOnInit(): void {

    this.gameSetupForm = new FormGroup({
      botNumber: new FormControl('', [Validators.required]),
      playersTeam: new FormControl('', [Validators.required])
    });
  }

  // Setup Functions with the form Group
  public validateControl = (controlName: string) => {
    return this.gameSetupForm.controls[controlName].invalid &&
      this.gameSetupForm.controls[controlName].touched;
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.gameSetupForm.controls[controlName].hasError(errorName);
  }

  public setupNewGame = (gameSetupFormValue: any) => {
    const formValues = { ...gameSetupFormValue };
    this.determinePlayOrder(formValues);
    this.gameStarted = true;
  }


  // Game Functions
  public determinePlayOrder = (playersChoices: any) =>{
    if (playersChoices.playersTeam === 'Random') {
      playersChoices.playersTeam = this.getRandomTeam();
    }
    // Intialise Human player variable and add to playerData
    let player = <PlayerPiece>{};
    player.playerTurn = this.getRandomInt(playersChoices.botNumber);
    player.team = playersChoices.playersTeam;
    player.name = "Player";
    this.playerData.push(player);
    // Add to taken turn number
    this.existingTurnOrders.push(player.playerTurn);
    this.playersObj = player;
    // Increment value that player belongs too
    if (player.team === 'Resistance') {
      this.resistanceNumber++;
    }
    else {
      this.spyNumber++;
    }
    // Set variables to bots
    for (let i = 0; i < playersChoices.botNumber; i++) {
      let bot = <PlayerPiece>{};
      bot.playerTurn = this.getRandomIntForBot(playersChoices.botNumber);
      bot.team = this.decideBotsTeam(playersChoices.botNumber, player.team);
      bot.name = "Bot-" + this.randomNames[i];
      this.playerData.push(bot);
    }
    console.log(this.playerData);
  }


  getRandomTeam(): string {
    let min = Math.ceil(0);
    let max = Math.floor(100);
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(randomNum);
   
    if (randomNum <= 50) {
      return "Resistance";
    }
    else {
      return "Spies";
    }
  }

  getRandomIntForBot(max: number): number {
    let randomNum = -1;
    let min = Math.ceil(0);
    max = Math.floor(max);
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    while (this.existingTurnOrders.includes(randomNum)) {
      randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    this.existingTurnOrders.push(randomNum);
    return randomNum;
  }
  getRandomInt(max: number): number {
    let min = Math.ceil(0);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  decideBotsTeam(botNumbers: number, playersTeam: string): string{
    let randomTeam = this.getRandomTeam();
    switch (botNumbers) {
      case 4:
        if (randomTeam === "Resistance" && this.resistanceNumber < 3) {
          this.resistanceNumber++;
          return "Resistance"
        }
        else if (randomTeam === "Spies" && this.spyNumber < 2) {
          this.spyNumber++;
          return "Spies"
        }
        else if (randomTeam === "Resistance" && this.resistanceNumber === 3) {
          this.spyNumber++;
          return "Spies";
        }
        else {
          this.resistanceNumber++;
          return "Resistance";
        }
        break;
      case 5:
        if (randomTeam === "Resistance" && this.resistanceNumber < 4) {
          this.resistanceNumber++;
          return "Resistance"
        }
        else if (randomTeam === "Spies" && this.spyNumber < 2) {
          this.spyNumber++;
          return "Spies"
        }
        else if (randomTeam === "Resistance" && this.resistanceNumber === 4) {
          this.spyNumber++;
          return "Spies";
        }
        else {
          this.resistanceNumber++;
          return "Resistance";
        }
        break;
      case 6:
        if (randomTeam === "Resistance" && this.resistanceNumber < 4) {
          this.resistanceNumber++;
          return "Resistance"
        }
        else if (randomTeam === "Spies" && this.spyNumber < 3) {
          this.spyNumber++;
          return "Spies"
        }
        else if (randomTeam === "Resistance" && this.resistanceNumber === 4) {
          this.spyNumber++;
          return "Spies";
        }
        else {
          this.resistanceNumber++;
          return "Resistance";
        }
        break;
      case 7:
        if (randomTeam === "Resistance" && this.resistanceNumber < 5) {
          this.resistanceNumber++;
          return "Resistance"
        }
        else if (randomTeam === "Spies" && this.spyNumber < 3) {
          this.spyNumber++;
          return "Spies"
        }
        else if (randomTeam === "Resistance" && this.resistanceNumber === 5) {
          this.spyNumber++;
          return "Spies";
        }
        else {
          this.resistanceNumber++;
          return "Resistance";
        }
        break;
      case 8:
        if (randomTeam === "Resistance" && this.resistanceNumber < 6) {
          this.resistanceNumber++;
          return "Resistance"
        }
        else if (randomTeam === "Spies" && this.spyNumber < 3) {
          this.spyNumber++;
          return "Spies"
        }
        else if (randomTeam === "Resistance" && this.resistanceNumber === 6) {
          this.spyNumber++;
          return "Spies";
        }
        else {
          this.resistanceNumber++;
          return "Resistance";
        }
        break;
      case 9:
        if (randomTeam === "Resistance" && this.resistanceNumber < 6) {
          this.resistanceNumber++;
          return "Resistance"
        }
        else if (randomTeam === "Spies" && this.spyNumber < 4) {
          this.spyNumber++;
          return "Spies"
        }
        else if (randomTeam === "Resistance" && this.resistanceNumber === 6) {
          this.spyNumber++;
          return "Spies";
        }
        else {
          this.resistanceNumber++;
          return "Resistance";
        }
        break;

    }
    return "broke";
  }
}
