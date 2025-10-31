// app/page.tsx
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6);

  const { data: polls } = await supabase
    .from('polls')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false })
    .limit(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* HEADER */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-700">Πολίτης / Pollitis</h1>
          <form action="/auth/google">
            <button
              type="submit"
              className="bg-green-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition"
            >
              Σύνδεση με Google
            </button>
          </form>
        </div>
      </header>

      {/* HERO */}
      <section className="text-center py-16 px-6">
        <h2 className="text-5xl font-black text-gray-800 mb-4">
          Παρακολούθησε τους Δήμους Θεσσαλονίκης
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Δες τι λένε, ψήφισε, ρώτα AI, ζήτα έλεγχο
        </p>
        <button className="bg-indigo-600 text-white px-10 py-4 text-lg rounded-full shadow-lg hover:bg-indigo-700 transition">
          Ξεκίνα
        </button>
      </section>

      {/* FILTER */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <label className="block text-sm font-medium mb-2 text-gray-700">Φίλτρο Δήμου</label>
        <select className="w-full md:w-80 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
          <option value="all">Όλοι οι Δήμοι</option>
          <option value="6114">6114 - ΔΗΜΟΣ ΘΕΣΣΑΛΟΝΙΚΗΣ</option>
          <option value="6167">6167 - ΔΗΜΟΣ ΚΑΛΑΜΑΡΙΑΣ</option>
          {/* Add more */}
        </select>
      </div>

      {/* AI FORM */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <form className="flex gap-3 max-w-2xl mx-auto">
          <input
            type="url"
            placeholder="Πάστε Facebook link..."
            className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700">
            AI Summary
          </button>
        </form>
      </div>

      {/* POSTS */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Τελευταίες Αναρτήσεις</h2>
        {posts?.length === 0 ? (
          <p className="text-center text-gray-500 py-10">Καμία ανάρτηση ακόμα.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts?.map((post: any) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-xs font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full inline-block mb-3">
                  {post.municipality_code}
                </div>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.summary}</p>
                <a href={post.source_url} target="_blank" className="text-indigo-600 text-sm hover:underline">
                  Δες πηγή →
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* POLLS SECTION */}
      <section className="bg-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center text-indigo-800">Δημοσκοπήσεις</h2>
          {polls?.length === 0 ? (
            <p className="text-center text-gray-600">Δεν υπάρχουν ενεργές δημοσκοπήσεις.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {polls?.map((poll: any) => (
                <div key={poll.id} className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold mb-3">{poll.question}</h3>
                  <div className="space-y-3">
                    {poll.options.map((opt: string, i: number) => (
                      <label key={i} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name={`poll-${poll.id}`} className="text-indigo-600" />
                        <span className="text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                  <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700">
                    Ψήφισε
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 text-center">
        <p className="text-sm">© 2025 Pollitis – Όλα τα δικαιώματα κατοχυρωμένα</p>
      </footer>
    </div>
  );
}
