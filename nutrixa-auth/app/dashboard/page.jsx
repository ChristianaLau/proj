import Image from "next/image";
import Link from "next/link";

export default function Home() 
{
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <header className="w-full flex justify-between items-center p-4 bg-custom-gradient border-b border-gray-300">
        <div className="flex items-center space-x-4">
          <Image
            src="/logo_and_banner.png"
            alt="logo and banner"
            width={500}
            height={50}
            priority
          />
          <nav className="flex space-x-4">
            <Link href="/CalendarPage" className="text-black text-sm hover:text-gray-700">Calendar</Link>
            <Link href="/ChatbotPage" className="text-black text-sm hover:text-gray-700">Chatbot</Link>
            <Link href="/NutritionPage" className="text-black text-sm hover:text-gray-700">Nutrition</Link>
            <Link href="/TrendsPage" className="text-black text-sm hover:text-gray-700">Trends</Link>
            <Link href="/WorkoutsPage" className="text-black text-sm hover:text-gray-700">Workouts</Link>
            <Link href="/LeaderBoardPage" className="text-black text-sm hover:text-gray-700">Leaderboard</Link>
          </nav>
          <div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="search"
                className="p-1 border border-gray-300 rounded-full text-sm"
              />
              <button className="p-1 bg-gray-300 hover:bg-gray-400 rounded-full text-sm">Search</button>
            </div>
          </div>
        </div>
      </header>
    </main>
  );
}