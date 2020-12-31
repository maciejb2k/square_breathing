export type Settings = {
  inhaleTime: number;
  holdInhaleTime: number;
  exhaleTime: number;
  holdExhaleTime: number;
  time: string;
};

export type SettingsType = Settings | Record<string, never>;
