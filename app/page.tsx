import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Home() {
  const { data: { session } } = await supabase.auth.getSession();
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(12);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-700">Πολίτης / Pollitis</h1>
          <div className="flex gap-3 items-center">
            {session ? (
              <div className="flex items-center gap-2">
                <img src={session.user.user_metadata.avatar_url} alt="Avatar" className="w-8 h-8 rounded-full" />
                <span className="text-sm">{session.user.email}</span>
              </div>
            ) : (
              <form action="/auth/google" method="post">
                <button className="bg-green-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-green-700">
                  Σύνδεση με Google
                </button>
              </form>
            )}
          </div>
        </div>
      </header>

      <section className="text-center py-20 px-6">
        <h2 className="text-5xl font-black text-gray-800 mb-4">Πολίτης - Παρακολούθησε τους Δήμους Θεσσαλονίκης</h2>
        <p className="text-xl text-gray-600 mb-8">Δες τι λένε, ψήφισε, ρώτα AI, ζήτα έλεγχο</p>
        <button className="bg-indigo-600 text-white px-10 py-4 text-lg rounded-full shadow-lg hover:bg-indigo-700">
          Ξεκίνα
        </button>
      </section>

      <div className="max-w-7xl mx-auto px-6 mb-8">
        <label className="block text-sm font-medium mb-2">Φίλτρο Δήμου</label>
        <select className="w-full md:w-80 p-3 border border-gray-300 rounded-lg">
          <option>Όλοι οι Δήμοι</option>
          <option value="6114">6114 - ΔΗΜΟΣ ΘΕΣΣΑΛΟΝΙΚΗΣ</option>
        </select>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {posts?.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-lg">Δεν υπάρχουν αναρτήσεις ακόμα.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts?.map((post: any) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="text-xs font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full inline-block mb-3">
                  {post.municipality_code}
                </div>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{post.summary}</p>
                <a href={post.source_url} target="_blank" className="text-indigo-600 text-sm hover:underline block mb-4">
                  Πηγή →
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
