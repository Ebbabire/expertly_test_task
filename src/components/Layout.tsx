import { Link } from "react-router-dom";
import { Globe, Search, Menu, ChevronDown } from "lucide-react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const tabs = [
    "Live",
    "Matches",
    "Standings",
    "Teams",
    "Comparison",
    "Statistics",
    "Venues",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-[#2d2f39] bg-[#0b0c10] flex items-center justify-between px-4 lg:px-8 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-[#00ff88] text-2xl font-bold tracking-tight"
          >
            stats<span className="text-[#7d40ff]">core</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`text-sm font-medium transition-colors hover:text-[#00ff88] ${
                  tab === "Matches"
                    ? "text-[#00ff88] relative after:absolute after:bottom-[-22px] after:left-0 after:right-0 after:h-[3px] after:bg-[#00ff88]"
                    : "text-[#94a3b8]"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 lg:gap-6">
          <div className="hidden sm:flex items-center gap-2 bg-[#1f212a] px-3 py-1.5 rounded-full text-xs font-medium border border-[#2d2f39]">
            <Globe size={14} className="text-[#00ff88]" />
            <div className="flex items-center gap-1">
              <span>Premier League</span>
              <ChevronDown size={14} />
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-[#1f212a] px-3 py-1.5 rounded-full text-xs font-medium border border-[#2d2f39]">
            <span>2024/25</span>
            <ChevronDown size={14} />
          </div>

          <div className="flex items-center gap-4">
            <button className="text-white hover:text-[#00ff88] transition-colors">
              <Search size={20} />
            </button>
            <button className="lg:hidden text-white">
              <Menu size={20} />
            </button>
            <div className="hidden lg:block w-8 h-8 rounded-full bg-linear-to-br from-[#00ff88] to-[#7d40ff] overflow-hidden border border-[#2d2f39]">
              <img
                src="https://picsum.photos/id/64/32/32"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto bg-[#0b0c10]">{children}</main>
    </div>
  );
};

export default Layout;
