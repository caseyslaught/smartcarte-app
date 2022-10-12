export enum AppOptions {
  Burn = "Burn Area Management",
  Forest = "Forest Monitoring",
  Search = "Search Land Cover Types",
}

export interface AppType {
  currentApp: AppOptions;
  setCurrentApp: (app: AppOptions) => void;
}
