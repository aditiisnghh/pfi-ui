// src/types/simulation.ts

/** Assets available for simulation */
export enum AssetType {
  AppleInc = "Apple Inc.",
  Microsoft = "Microsoft Corporation",
  Google = "Google (Alphabet Inc.)",
  Amazon = "Amazon.com, Inc.",
  JPMorganChase = "JPMorgan Chase & Co.",
  HDFCBANK = "HDFC Bank Limited",
  ICICIBANK = "ICICI Bank Limited",
  RELIANCE = "Reliance Industries Limited",
  TCS = "Tata Consultancy Services Limited",
  INFY = "Infosys Limited",
  TSLA = "Tesla, Inc.",
  NVDA = "NVIDIA Corporation",
  XOM = "Exxon Mobil Corporation",
  SPY = "SPDR S&P 500 ETF Trust",
  NIFTYBEES = "Nippon India ETF Nifty 50",
}

/** Historical time horizon */
export enum TimePeriod {
  ONE_TO_THREE_YEARS = "1 to 3 years",
  THREE_TO_SIX_YEARS = "3 to 6 years",
  SIX_AND_MORE_YEARS = "6 and more years",
}

/** Risk tolerance levels */
export enum RiskTolerance {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}
