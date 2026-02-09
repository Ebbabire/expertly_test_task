import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#050611]">
      {/* Header */}
      <Navbar />
      <main className="flex-1 overflow-auto bg-[#0b0c10]">{children}</main>
    </div>
  );
};

export default Layout;
