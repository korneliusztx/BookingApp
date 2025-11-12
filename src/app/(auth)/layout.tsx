export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-primary/20">
      {children}
    </main>
  );
}
