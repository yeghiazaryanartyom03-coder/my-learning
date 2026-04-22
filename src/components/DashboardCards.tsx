export function DashboardCards() {
  const cards = [
    {
      title: "Revenue",
      value: "$24,580",
      change: "+12.4%",
      text: "Compared to last month",
    },
    {
      title: "Active Plan",
      value: "Pro",
      change: "Current",
      text: "Your subscription is active",
    },
    {
      title: "Usage",
      value: "82%",
      change: "+6.1%",
      text: "Of your monthly limit",
    },
    {
      title: "Sessions",
      value: "14",
      change: "Live",
      text: "Across all devices",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-3xl border border-white/5 bg-[#101a2d]/90 p-5 shadow-[0_16px_40px_rgba(2,8,23,0.22)] backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_46px_rgba(2,8,23,0.30)]"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#8ea3bf]">
                {card.title}
              </p>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-[#eaf2ff]">
                {card.value}
              </h3>
            </div>

            <span className="rounded-full bg-[#22c55e]/10 px-2.5 py-1 text-xs font-medium text-[#22c55e]">
              {card.change}
            </span>
          </div>

          <p className="mt-3 text-sm leading-6 text-[#8ea3bf]">
            {card.text}
          </p>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#15243d]">
            <div className="h-full w-[72%] rounded-full bg-linear-to-r from-[#2f6feb] to-[#22d3ee]" />
          </div>
        </div>
      ))}
    </div>
  );
}