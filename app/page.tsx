'use client';

import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

const supabase = createClient(
  'https://fmslmemnewwkxtyxnebn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtc2xtZW1uZXd3a3h0eXhuZWJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4NDMwODksImV4cCI6MjA3NzQxOTA4OX0.kTxrnYNtUyUwFIqms3Z2dCAcAubUL2rG4wjowlmAWKM'
);

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [lang, setLang] = useState('el');
  const [municipality, setMunicipality] = useState('all');

  useEffect(() => {
    loadPosts();
  }, [municipality]);

  const loadPosts = async () => {
    let query = supabase.from('posts').select('*').order('created_at', { ascending: false }).limit(12);
    if (municipality !== 'all') query = query.eq('municipality_code', municipality);
    const { data } = await query;
    setPosts(data || []);
  };

  const t = {
    el: {
      title: 'Πολίτης - Παρακολούθησε τους Δήμους Θεσσαλονίκης',
      subtitle: 'Δες τι λένε, ψήφισε, ρώτα AI, ζήτα έλεγχο',
      explore: 'Ξεκίνα',
      filter: 'Φίλτρο Δήμου',
      all: 'Όλοι οι Δήμοι',
      no_posts: 'Δεν υπάρχουν αναρτήσεις ακόμα. Οι διαχειριστές θα προσθέσουν σύντομα!'
    },
    en: {
      title: 'Pollitis - Track Thessaloniki Municipalities',
      subtitle: 'See what they say, vote, ask AI, request fact-check',
      explore: 'Explore',
      filter: 'Filter by Municipality',
      all: 'All Municipalities',
      no_posts: 'No posts yet. Admins will add soon!'
    }
  };

  const current = t[lang];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-700">Πολίτης / Pollitis</h1>
          <div className="flex gap-3 items-center">
            <button onClick={() => setLang('el')} className={`px-3 py-1 rounded ${lang === 'el' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>ΕΛ</button>
            <button onClick={() => setLang('en')} className={`px-3 py-1 rounded ${lang === 'en' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>EN</button>
          </div>
        </div>
      </header>

      <section className="text-center py-20 px-6">
        <h2 className="text-5xl font-black text-gray-800 mb-4">{current.title}</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">{current.subtitle}</p>
        <button className="bg-indigo-600 text-white px-10 py-4 text-lg rounded-full shadow-lg hover:bg-indigo-700">
          {current.explore}
        </button>
      </section>

      <div className="max-w-7xl mx-auto px-6 mb-8">
        <label className="block text-sm font-medium mb-2">{current.filter}</label>
        <select
          value={municipality}
          onChange={(e) => setMunicipality(e.target.value)}
          className="w-full md:w-80 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">{current.all}</option>
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

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-lg">{current.no_posts}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
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
