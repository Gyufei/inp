export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen bg-[#030305] min-h-screen pt-[72px] pb-[100px]">
      <div className="w-[1200px] mx-auto">{children}</div>
    </div>
  );
}
