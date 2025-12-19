import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { TimePeriod, RiskTolerance } from "../../types/simulation";

const STOCK_SECTORS = [
  {
    sector: "Big Tech",
    stocks: [
      { label: "Apple Inc. (AAPL)", value: "AAPL" },
      { label: "Microsoft Corporation (MSFT)", value: "MSFT" },
      { label: "Alphabet Inc. (GOOGL)", value: "GOOGL" },
      { label: "Amazon.com, Inc. (AMZN)", value: "AMZN" },
      { label: "Meta Platforms, Inc. (META)", value: "META" },
    ],
  },
  {
    sector: "Growth / AI",
    stocks: [
      { label: "NVIDIA Corporation (NVDA)", value: "NVDA" },
      { label: "Tesla, Inc. (TSLA)", value: "TSLA" },
    ],
  },
  {
    sector: "Enterprise Technology",
    stocks: [{ label: "Oracle Corporation (ORCL)", value: "ORCL" }],
  },
  {
    sector: "Banking",
    stocks: [
      { label: "JPMorgan Chase & Co. (JPM)", value: "JPM" },
      { label: "Goldman Sachs Group, Inc. (GS)", value: "GS" },
      { label: "Bank of America Corporation (BAC)", value: "BAC" },
    ],
  },
  {
    sector: "Energy",
    stocks: [
      { label: "Exxon Mobil Corporation (XOM)", value: "XOM" },
      { label: "Chevron Corporation (CVX)", value: "CVX" },
    ],
  },
  {
    sector: "Market Index",
    stocks: [
      { label: "SPDR S&P 500 ETF Trust (SPY)", value: "SPY" },
      { label: "Invesco QQQ Trust (QQQ)", value: "QQQ" },
    ],
  },
];

const MIN_STOCKS = 5;
const MAX_STOCKS = 15;

const MacbookAir = (): JSX.Element => {
  const isDesktop = window.matchMedia("(hover: hover)").matches;

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeSector, setActiveSector] = useState(STOCK_SECTORS[0].sector);
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
  const [timePeriod, setTimePeriod] = useState<TimePeriod | null>(null);
  const [riskTolerance, setRiskTolerance] =
    useState<RiskTolerance | null>(null);

  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const scheduleClose = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 300);
  };

  useEffect(() => {
    if (isDesktop) return;

    const handleOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () =>
      document.removeEventListener("mousedown", handleOutside);
  }, [isDesktop]);

  const canCalculate =
    selectedStocks.length >= MIN_STOCKS &&
    selectedStocks.length <= MAX_STOCKS &&
    timePeriod &&
    riskTolerance;

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header className="bg-[#0A2540] py-6 text-center">
        <h1 className="text-white text-3xl md:text-4xl lg:text-[50px] font-semibold">
          Portfolio Risk Intelligence
        </h1>
      </header>

      <main className="flex-1 px-4 sm:px-8 md:px-16 lg:px-[259px] pt-12">
        <h2 className="text-2xl md:text-3xl mb-12 font-semibold">
          Simulation Settings
        </h2>

        <div className="flex flex-col gap-12">
          {/* Stock Selection */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <label className="text-xl">
              Stock Selection
              <span className="block text-sm text-gray-500">
                Select {MIN_STOCKS}–{MAX_STOCKS} stocks
              </span>
            </label>

            <div
              ref={dropdownRef}
              className="relative w-full sm:w-[372px]"
              onMouseEnter={() => {
                if (isDesktop) {
                  cancelClose();
                  setOpenDropdown("stock");
                }
              }}
              onMouseLeave={() => {
                if (isDesktop) scheduleClose();
              }}
            >
              <button
                onClick={() => {
                  if (!isDesktop) {
                    setOpenDropdown(
                      openDropdown === "stock" ? null : "stock"
                    );
                  }
                }}
                className="w-full h-[56px] bg-[#0A2540] text-white rounded-[28px] px-4 text-left"
              >
                {selectedStocks.length === 0
                  ? "Select stocks to include in the simulation"
                  : `${selectedStocks.length} stocks selected`}
              </button>

              {openDropdown === "stock" && (
                <div
                  className="absolute mt-2 flex bg-white rounded-xl shadow-lg z-50"
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  <div className="w-[200px] border-r">
                    {STOCK_SECTORS.map((sector) => (
                      <div
                        key={sector.sector}
                        onMouseEnter={() =>
                          setActiveSector(sector.sector)
                        }
                        className={`px-4 py-3 cursor-pointer font-medium ${
                          activeSector === sector.sector
                            ? "bg-gray-100"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        {sector.sector}
                      </div>
                    ))}
                  </div>

                  <div className="w-[320px]">
                    {STOCK_SECTORS.find(
                      (s) => s.sector === activeSector
                    )?.stocks.map((stock) => {
                      const isSelected =
                        selectedStocks.includes(stock.label);
                      const isDisabled =
                        !isSelected &&
                        selectedStocks.length >= MAX_STOCKS;

                      return (
                        <div
                          key={stock.value}
                          onClick={() => {
                            if (isDisabled) return;
                            setSelectedStocks((prev) =>
                              isSelected
                                ? prev.filter(
                                    (x) => x !== stock.label
                                  )
                                : [...prev, stock.label]
                            );
                          }}
                          className={`px-4 py-3 text-sm cursor-pointer ${
                            isSelected
                              ? "bg-blue-100 font-medium"
                              : "hover:bg-blue-50"
                          } ${
                            isDisabled
                              ? "opacity-40 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          {stock.label}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Time Period */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <label className="text-xl">Time Period Selection</label>
            <Select
              onOpenChange={() => setOpenDropdown(null)}
              onValueChange={(v) => setTimePeriod(v as TimePeriod)}
            >
              <SelectTrigger className="w-full sm:w-[372px] h-14 bg-[#0A2540] text-white rounded-[101px] px-6">
                <SelectValue placeholder="Select the historical time horizon" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={TimePeriod.ONE_TO_THREE_YEARS}>
                  1–3 years (Low)
                </SelectItem>
                <SelectItem value={TimePeriod.THREE_TO_SIX_YEARS}>
                  3–6 years (Medium)
                </SelectItem>
                <SelectItem value={TimePeriod.SIX_AND_MORE_YEARS}>
                  6+ years (High)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Risk Tolerance */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <label className="text-xl">Risk Tolerance Selection</label>
            <Select
              onOpenChange={() => setOpenDropdown(null)}
              onValueChange={(v) =>
                setRiskTolerance(v as RiskTolerance)
              }
            >
              <SelectTrigger className="w-full sm:w-[372px] h-14 bg-[#0A2540] text-white rounded-[101px] px-6">
                <SelectValue placeholder="Select your risk tolerance level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={RiskTolerance.LOW}>Low</SelectItem>
                <SelectItem value={RiskTolerance.MEDIUM}>
                  Medium
                </SelectItem>
                <SelectItem value={RiskTolerance.HIGH}>High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Selected Stocks Summary */}
          {selectedStocks.length > 0 && (
            <div className="bg-gray-50 border rounded-xl px-4 py-3">
              <h3 className="text-base font-medium mb-2">
                Selected Stocks ({selectedStocks.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedStocks.map((stock) => (
                  <span
                    key={stock}
                    onClick={() =>
                      setSelectedStocks((prev) =>
                        prev.filter((s) => s !== stock)
                      )
                    }
                    className="flex items-center gap-2 bg-[#0A2540] text-white px-3 py-1 rounded-full text-sm cursor-pointer"
                  >
                    {stock}
                    <span className="text-xs">✕</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Button */}
          <div className="flex justify-center pt-6">
            <button
              disabled={!canCalculate}
              className={`px-10 py-4 rounded-full text-lg font-medium ${
                canCalculate
                  ? "bg-[#0A2540] text-white hover:bg-[#123a63]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Calculate Risk
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MacbookAir;
