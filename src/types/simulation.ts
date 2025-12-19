export enum StockName {
  AppleInc = "Apple Inc.",
  MicrosoftCorporation = "Microsoft Corporation",
  AlphabetInc = "Alphabet Inc.",
  AmazonComInc = "Amazon.com, Inc.",
  MetaPlatformsInc = "Meta Platforms, Inc.",

  NvidiaCorporation = "NVIDIA Corporation",
  TeslaInc = "Tesla, Inc.",

  OracleCorporation = "Oracle Corporation",

  JPMorganChase = "JPMorgan Chase & Co.",
  GoldmanSachs = "Goldman Sachs Group, Inc.",
  BankOfAmerica = "Bank of America Corporation",

  ExxonMobil = "Exxon Mobil Corporation",
  ChevronCorporation = "Chevron Corporation",

  SPDRSP500ETF = "SPDR S&P 500 ETF Trust",
  InvescoQQQTrust = "Invesco QQQ Trust",
}

export enum TimePeriod {
  ONE_TO_THREE_YEARS = "1–3 years",
  THREE_TO_SIX_YEARS = "3–6 years",
  SIX_AND_MORE_YEARS = "6+ years",
}

export enum RiskTolerance {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

export const MIN_PORTFOLIO_SIZE = 5;
export const MAX_PORTFOLIO_SIZE = 15;

export interface PortfolioInput {
  stocks: StockName[];
  timePeriod: TimePeriod;
  riskTolerance: RiskTolerance;
}

export interface SimulationResult {
  expectedReturn: number;
  volatility: number;
  sharpeRatio: number;
  riskLevel: RiskTolerance;
}
