export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1>Dashboard</h1>
      <section>{children}</section>
    </div>
  );
}
