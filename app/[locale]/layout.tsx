import ConnectBtn from '@/lib/components/connect-btn';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen">
      <video className="fixed top-0 bottom-0 left-0 right-0 -z-10" src="/1-1.mp4" muted loop autoPlay playsInline />
      <div className="w-[1200px] mx-auto">
        <div className="h-[72px] flex items-center justify-end">
          <ConnectBtn />
        </div>
        {children}
      </div>
    </div>
  );
}
