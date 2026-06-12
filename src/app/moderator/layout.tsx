export default function ModeratorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-100 text-white font-sans">
      {children}
    </div>
  );
}
