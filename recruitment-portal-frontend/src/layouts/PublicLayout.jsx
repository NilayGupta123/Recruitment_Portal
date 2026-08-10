import Navbar from "../components/public/Navbar";

export default function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-canvas)]">
      <Navbar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
