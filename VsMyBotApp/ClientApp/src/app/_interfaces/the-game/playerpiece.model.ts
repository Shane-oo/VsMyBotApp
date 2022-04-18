export interface PlayerPiece {
  team: string;
  playerTurn: number;
  name: string;
  missionLeader: boolean;
  onMission: boolean;

  // Machine learning Data
  resistanceData: number[];

}