export function WarrantyBadge() {
  return (
    <div className="flex justify-center">
      <div className="relative w-64 h-64">
        {/* Outer circle */}
        <div className="absolute inset-0 rounded-full bg-royal-blue shadow-xl"></div>

        {/* Inner circle */}
        <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="text-7xl font-bold text-royal-blue leading-none">25</div>
            <div className="text-xl font-bold text-royal-blue leading-tight">
              Year
              <br />
              Limited Lifetime
              <br />
              Warranty
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 rounded-full border-4 border-dashed border-royal-gold opacity-50"></div>
      </div>
    </div>
  )
}
