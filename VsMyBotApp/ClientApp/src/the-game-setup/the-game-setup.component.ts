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
  public Teams: string[] = ["Random", "Resitance", "Spies"];
  public MissionNumbers: number[] = [];
  public MissionOneMembers: PlayerPiece[] = [];
  public MissionTwoMembers: PlayerPiece[] = [];
  public MissionThreeMembers: PlayerPiece[] = [];
  public MissionFourMembers: PlayerPiece[] = [];
  public MissionFiveMembers: PlayerPiece[] = [];
  public CurrentMission: number = 0;


  public gameStarted!: boolean;
  public playerData: PlayerPiece[] = [];
  public topHalf: PlayerPiece[] = [];
  public bottomHalf: PlayerPiece[] = [];
  public half: number = 0;
  public spyNumber: number = 0;
  public resistanceNumber: number = 0;
  public existingTurnOrders: number[] = [];
  public playersObj!: PlayerPiece;
  public randomNames: string[] = ["Shane", "Chloe", "Hamish", "Ciaran", "Brandon", "Geemal", "Maya", "Natalie", "Jaeley"];

  public playerIsMissionLeader: boolean = false;
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

    // Set First player going first to be mission leader
    for (var i = 0; i < this.playerData.length; i++) {
      if (this.playerData[i].playerTurn == 0) {
        this.playerData[i].missionLeader = true;
      }
    }
    // order player data by turn order
    this.playerData = this.playerData.sort(({ playerTurn: a }, { playerTurn: b }) => a - b);
    console.log(this.playerData);

    this.half = Math.ceil(this.playerData.length / 2);

    for (var i = 0; i < this.playerData.length; i++) {
      if (i < this.half) {
        this.topHalf.push(this.playerData[i]);
      }
      else {
        this.bottomHalf.push(this.playerData[i]);
      }
    }
    this.checkPlayerIsMissionLeader();
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

    player.missionLeader = true;

    player.onMission = false;
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
      bot.missionLeader = false;
      bot.onMission = false;
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


  // Check to see if the player has been assigned as the mission leader
  checkPlayerIsMissionLeader() {
    for (var i = 0; i < this.playerData.length; i++) {
      if (this.playerData[i].name === "Player" && this.playerData[i].missionLeader) {
        this.playerIsMissionLeader = true;
        break;
      }
      else {
        this.playerIsMissionLeader = false;
      }
    }
  }
  selectedTeamMember(boardPiece: PlayerPiece) {
    if (this.CurrentMission == 0) {
      if (this.MissionOneMembers.length < this.MissionNumbers[this.CurrentMission]) {
        if (!this.MissionOneMembers.find(peice => peice == boardPiece)) {

          this.MissionOneMembers.push(boardPiece);
        }
      }
    }
    else if (this.CurrentMission == 1) {
      if (this.MissionTwoMembers.length < this.MissionNumbers[this.CurrentMission]) {
        if (!this.MissionTwoMembers.find(peice => peice == boardPiece)) {

          this.MissionTwoMembers.push(boardPiece);
        }
      }
    }
    else if (this.CurrentMission == 2) {
      if (this.MissionThreeMembers.length < this.MissionNumbers[this.CurrentMission]) {
        if (!this.MissionThreeMembers.find(peice => peice == boardPiece)) {

          this.MissionThreeMembers.push(boardPiece);
        }
      }
    }
    else if (this.CurrentMission == 3) {
      if (this.MissionFourMembers.length < this.MissionNumbers[this.CurrentMission]) {
        if (!this.MissionFourMembers.find(peice => peice == boardPiece)) {

          this.MissionFourMembers.push(boardPiece);
        }
      }
    }
    else if (this.CurrentMission == 4) {
      if (this.MissionFiveMembers.length < this.MissionNumbers[this.CurrentMission]) {
        if (!this.MissionFiveMembers.find(peice => peice == boardPiece)) {

          this.MissionFiveMembers.push(boardPiece);
        }
      }
    } 
  }

  RemoveFromMission(removedPlayer: PlayerPiece) {
    if (this.CurrentMission == 0) {
      this.MissionOneMembers = this.MissionOneMembers.filter((member) => member !== removedPlayer);
    }
    if (this.CurrentMission == 1) {
      this.MissionTwoMembers = this.MissionTwoMembers.filter((member) => member !== removedPlayer);
    }
    if (this.CurrentMission == 2) {
      this.MissionThreeMembers = this.MissionThreeMembers.filter((member) => member !== removedPlayer);
    }
    if (this.CurrentMission == 3) {
      this.MissionFourMembers = this.MissionFourMembers.filter((member) => member !== removedPlayer);
    } 
    if (this.CurrentMission == 4) {
      this.MissionFiveMembers = this.MissionFiveMembers.filter((member) => member !== removedPlayer);
    }
  }


  decideBotsTeam(botNumbers: number, playersTeam: string): string{
    let randomTeam = this.getRandomTeam();
    switch (botNumbers) {
      case 4:
        this.MissionNumbers = [2, 3, 2, 3, 3];
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
        this.MissionNumbers = [2, 3, 4, 3, 4];
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
        this.MissionNumbers = [2, 3, 3, 4, 4];
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
        this.MissionNumbers = [3, 4, 4, 5, 5];
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
        this.MissionNumbers = [3, 4, 4, 5, 5];
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
        this.MissionNumbers = [3, 4, 4, 5, 5];
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
