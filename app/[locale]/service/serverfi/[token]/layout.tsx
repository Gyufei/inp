export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen bg-[#08080A] pt-[72px] pb-[10px]">
      <div className="w-[1200px] mx-auto">{children}</div>
    </div>
  );
}
