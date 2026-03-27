
export interface MeditationResult {
  verse: string;
  meditation: string;
  christConnection: string;
  mentorWisdom: string;
  application: string;
  prayer: string;
  intercessoryPrayer: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
