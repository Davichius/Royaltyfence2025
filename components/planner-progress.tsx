"use client"

export function PlannerProgress({ step }: { step: number }) {
  const steps = [
    { number: 1, name: "Draw Fence" },
    { number: 2, name: "Select Type" },
    { number: 3, name: "Get Quote" },
  ]

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col items-center relative">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                s.number === step
                  ? "bg-[#1e3a8a] text-white"
                  : s.number < step
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              {s.number < step ? "✓" : s.number}
            </div>
            <span className={`text-xs mt-1 ${s.number === step ? "font-medium" : ""}`}>{s.name}</span>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="absolute h-[2px] bg-gray-200 w-[calc(100%-2rem)] left-[calc(50%+1rem)] top-4 -translate-y-1/2">
                <div
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ width: step > s.number ? "100%" : "0%" }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
