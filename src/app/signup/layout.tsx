
import Link from 'next/link';
import Image from 'next/image';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark flex min-h-screen flex-col bg-gradient-to-br from-[#1a0c20] via-[#2a1435] to-[#4b2959] text-white">
       <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-transparent">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.png" alt="Insightly Logo" width={32} height={32} data-ai-hint="logo" />
                <span className="font-headline text-lg font-bold">Insightly</span>
            </Link>
        </div>
      </header>
      <div className="flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-8">
        {children}
      </div>
    </div>
  );
}
