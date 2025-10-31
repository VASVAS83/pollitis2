// app/page.tsx
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(12);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* HEADER */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-700">Πολίτης / Pollitis</h1>
          <div className="flex gap-3 items-center">
            {session ? (
              <div className="flex items-center gap-2">
                <img
                  src={session.user.user_metadata.avatar_url}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border"
                />
                <span className="text-sm font-medium text-gray-700">
                  {session.user.email}
                </span>
              </div>
            ) : (
              <form action="/auth/google" method="POST">
  <button type="submit" className="bg-green-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition">
    Σύνδεση με Google
  </button>
</form>
            )}
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="text-center py-20 px-6">
        <h2 className="text-5xl font-black text-gray-800 mb-4">
          Πολίτης - Παρακολούθησε τους Δήμους Θεσσαλονίκης
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
        <select className="w-full md:w-80 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
          <option value="all">Όλοι οι Δήμοι</option>
          <option value="6114">6114 - ΔΗΜΟΣ ΘΕΣΣΑΛΟΝΙΚΗΣ</option>
          <option value="6167">6167 - ΔΗΜΟΣ ΚΑΛΑΜΑΡΙΑΣ</option>
          <option value="6027">6027 - ΑΜΠΕΛΟΚΗΠΩΝ-ΜΕΝΕΜΕΝΗΣ</option>
          <option value="6057">6057 - ΔΗΜΟΣ ΒΟΛΒΗΣ</option>
          <option value="6071">6071 - ΔΗΜΟΣ ΔΕΛΤΑ</option>
          <option value="6111">6111 - ΔΗΜΟΣ ΘΕΡΜΑΙΚΟΥ</option>
          <option value="6113">6113 - ΔΗΜΟΣ ΘΕΡΜΗΣ</option>
          <option value="6190">6190 - ΔΗΜΟΣ ΚΟΡΔΕΛΙΟΥ-ΕΥΟΣΜΟΥ</option>
          <option value="6202">6202 - ΔΗΜΟΣ ΛΑΓΚΑΔΑ</option>
          <option value="6238">6238 - ΔΗΜΟΣ ΝΕΑΠΟΛΗΣ-ΣΥΚΕΩΝ</option>
          <option value="6258">6258 - ΔΗΜΟΣ ΠΑΥΛΟΥ ΜΕΛΑ</option>
          <option value="6271">6271 - ΔΗΜΟΣ ΠΥΛΑΙΑΣ-ΧΟΡΤΙΑΤΗ</option>
          <option value="6315">6315 - ΔΗΜΟΣ ΧΑΛΚΗΔΟΝΟΣ</option>
          <option value="6323">6323 - ΔΗΜΟΣ ΩΡΑΙΟΚΑΣΤΡΟΥ</option>
        </select>
      </div>

      {/* POSTS GRID */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {posts?.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-lg">
            Δεν υπάρχουν αναρτήσεις ακόμα. Οι διαχειριστές θα προσθέσουν σύντομα!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts?.map((post: any) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300"
              >
                <div className="text-xs font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full inline-block mb-3">
                  {post.municipality_code}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.summary}</p>
                <a
                  href={post.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 text-sm font-medium hover:underline flex items-center gap-1"
                >
                  Πηγή
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
