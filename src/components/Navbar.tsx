import { ChevronDown, Menu } from "lucide-react";
import { Link } from "react-router-dom";

import globeIcon from "../assets/icons8-globe-94.png";
import footballIcon from "../assets/icons8-football-100.png";
import england from "../assets/icons8-england-48.png";

const tabs = [
  "Live",
  "Matches",
  "Standings",
  "Teams",
  "Comparison",
  "Statistics",
  "Venues",
];

const Navbar = () => {
  return (
    <header className="h-16 bg-[#7d40ff] sticky top-0 z-50 flex justify-center">
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-white text-xl xl:text-2xl font-extrabold tracking-tight"
          >
            stats<span className="text-[#00ff88]">core</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-3 xl:gap-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`relative text-sm font-semibold tracking-wide transition-colors hover:text-white ${
                  tab === "Matches"
                    ? "after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[3px] after:bg-[#00ff88] text-[#00ff88]"
                    : "text-white/80"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 xl:gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-black/10 p-1 lg:p-2 rounded-full order-2 lg:order-1">
              <img
                src={globeIcon}
                alt="Globe"
                className="size-5 lg:size-6 rounded-full"
              />
            </div>

            <div className="bg-black/10 p-1 lg:p-2 rounded-full order-1 lg:order-2">
              <img
                src={footballIcon}
                alt="Football"
                className="size-5 lg:size-6 rounded-full bg-white object-cover "
              />
            </div>
          </div>
          <div className="flex items-center gap-2 bg-black/10 px-2 py-1 lg:px-3 lg:py-2.5 rounded-full text-xs font-semibold text-white">
            <img
              src={england}
              alt="Premier League"
              className="w-4 h-4 rounded-full border-white border"
            />
            <div className="hidden xl:flex items-center gap-1">
              <span>Premier League</span>
              <ChevronDown size={14} />
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-xs font-semibold text-white">
            <span>2024/25</span>
            <ChevronDown size={14} />
          </div>

          <div className="flex items-center gap-4">
            <button className="lg:hidden text-white">
              <Menu size={20} />
            </button>
            <div className="hidden lg:block w-8 h-8 rounded-full bg-white overflow-hidden border border-white/20">
              <img
                src="https://picsum.photos/id/64/32/32"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
