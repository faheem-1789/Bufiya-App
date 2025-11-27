import Link from 'next/link';

export default function Home() {
  const btnClass = "p-6 rounded-xl text-white font-bold text-xl flex flex-col items-center justify-center transition hover:scale-105";
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 gap-6">
      <h1 className="text-4xl text-white font-bold mb-4">Bufiya System</h1>
      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
        <Link href="/customer" className={`bg-emerald-600 ${btnClass}`}>🍔 Customer</Link>
        <Link href="/employee" className={`bg-blue-600 ${btnClass}`}>👨‍🍳 Kitchen</Link>
        <Link href="/manager" className={`bg-orange-600 ${btnClass}`}>📋 Manager</Link>
        <Link href="/owner" className={`bg-purple-600 ${btnClass}`}>👑 Owner</Link>
      </div>
    </div>
  );
}