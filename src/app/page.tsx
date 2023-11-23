import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-black text-6xl">
        <Link href="/dashboard">Kintai</Link>
      </div>
    </main>
  )
}
