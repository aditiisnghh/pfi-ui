import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  AssetType,
  TimePeriod,
  RiskTolerance,
} from "../../types/simulation";

const settingsData = [
  {
    id: "asset-selection",
    label: "Stock Selection",
    placeholder: "Select stocks to include in the simulation",
  },
  {
    id: "time-period",
    label: "Time Period Selection",
    placeholder: "Select the historical time horizon",
  },
  {
    id: "risk-tolerance",
    label: "Risk Tolerance Selection",
    placeholder: "Select your risk tolerance level",
  },
];

const MacbookAir = (): JSX.Element => {
  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full bg-[#0A2540] flex items-center justify-center px-4 py-6 animate-fade-in opacity-0">
        <h1 className="font-semibold text-white text-center text-2xl sm:text-3xl md:text-4xl lg:text-[50px]">
          Portfolio Risk Intelligence
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-8 md:px-16 lg:px-[259px] pt-8 sm:pt-12 md:pt-16 lg:pt-[82px]">
        <h2 className="font-semibold text-black text-center sm:text-left text-xl sm:text-2xl md:text-3xl lg:text-[32px] mb-10 sm:mb-14 lg:mb-[78px] animate-fade-in opacity-0 [--animation-delay:200ms]">
          Simulation Settings
        </h2>

        <div className="flex flex-col gap-10 sm:gap-[46px]">
          {settingsData.map((setting, index) => (
            <div
              key={setting.id}
              className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in opacity-0"
              style={
                {
                  "--animation-delay": `${400 + index * 200}ms`,
                } as React.CSSProperties
              }
            >
              {/* Label */}
              <label
                htmlFor={setting.id}
                className="font-normal text-black text-lg sm:text-xl md:text-2xl whitespace-nowrap"
              >
                {setting.label}
              </label>

              {/* Dropdown */}
              <Select>
                <SelectTrigger
                  id={setting.id}
                  className="w-full sm:w-[280px] md:w-[320px] lg:w-[372px] h-14 bg-[#0A2540] rounded-[101px] border-0 font-light text-white text-base px-6"
                >
                  <SelectValue placeholder={setting.placeholder} />
                </SelectTrigger>

                <SelectContent>
                  {/* Asset Selection */}
                  {setting.id === "asset-selection" && (
                    <>
                      <SelectItem value={AssetType.AppleInc}>
                        Apple Inc.
                      </SelectItem>
                      <SelectItem value={AssetType.Microsoft}>
                        Microsoft Corporation
                      </SelectItem>
                      <SelectItem value={AssetType.Google}>
                        Google (Alphabet Inc.)
                      </SelectItem>
                      <SelectItem value={AssetType.Amazon}>
                        Amazon.com, Inc.
                      </SelectItem>
                      <SelectItem value={AssetType.JPMorganChase}>
                        JPMorgan Chase & Co.
                      </SelectItem>
                      <SelectItem value={AssetType.HDFCBANK}>
                        HDFC Bank Limited
                      </SelectItem>
                      <SelectItem value={AssetType.ICICIBANK}>
                        ICICI Bank Limited
                      </SelectItem>
                      <SelectItem value={AssetType.RELIANCE}>
                        Reliance Industries Limited
                      </SelectItem>
                      <SelectItem value={AssetType.TCS}>
                        Tata Consultancy Services Limited
                      </SelectItem>
                      <SelectItem value={AssetType.INFY}>
                        Infosys Limited
                      </SelectItem>
                      <SelectItem value={AssetType.TSLA}>
                        Tesla, Inc.
                      </SelectItem>
                      <SelectItem value={AssetType.NVDA}>
                        NVIDIA Corporation
                      </SelectItem>
                      <SelectItem value={AssetType.XOM}>
                        Exxon Mobil Corporation
                      </SelectItem>
                      <SelectItem value={AssetType.SPY}>
                        SPDR S&P 500 ETF Trust
                      </SelectItem>
                      <SelectItem value={AssetType.NIFTYBEES}>
                        Nippon India ETF Nifty 50
                      </SelectItem>
                    </>
                  )}

                  {/* Time Period Selection */}
                  {setting.id === "time-period" && (
                    <>
                      <SelectItem value={TimePeriod.ONE_TO_THREE_YEARS}>
                        1 to 3 years
                      </SelectItem>
                      <SelectItem value={TimePeriod.THREE_TO_SIX_YEARS}>
                        3 to 6 years
                      </SelectItem>
                      <SelectItem value={TimePeriod.SIX_AND_MORE_YEARS}>
                        6 and more years
                      </SelectItem>
                    </>
                  )}

                  {/* Risk Tolerance Selection */}
                  {setting.id === "risk-tolerance" && (
                    <>
                      <SelectItem value={RiskTolerance.LOW}>Low</SelectItem>
                      <SelectItem value={RiskTolerance.MEDIUM}>
                        Medium
                      </SelectItem>
                      <SelectItem value={RiskTolerance.HIGH}>High</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MacbookAir;
