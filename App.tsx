
import React, { useState } from 'react';
import Header from './components/Header';
import LoadingState from './components/LoadingState';
import MeditationDisplay from './components/MeditationDisplay';
import { generateMeditation } from './services/geminiService';
import { MeditationResult, AppStatus } from './types';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [result, setResult] = useState<MeditationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setStatus(AppStatus.LOADING);
    setError(null);
    
    try {
      const data = await generateMeditation(input);
      setResult(data);
      setStatus(AppStatus.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setError(err.message || '묵상문을 생성하는 중에 오류가 발생했습니다.');
      setStatus(AppStatus.ERROR);
    }
  };

  const handleReset = () => {
    setInput('');
    setResult(null);
    setStatus(AppStatus.IDLE);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <Header />

      <main className="mt-8">
        {status === AppStatus.IDLE && (
          <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-stone-800 serif-font">
                오늘의 말씀을 입력하세요
              </h3>
              <p className="text-stone-10500 font-light">
                마음속에 머무는 구절이나 묵상하고 싶은 본문을 기록해주세요.
              </p>
            </div>

            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="예: 시편 23:1 - 여호와는 나의 목자시니 내게 부족함이 없으리로다"
                  className="w-full min-h-[160px] p-6 text-lg border-2 border-stone-200 rounded-2xl focus:ring-2 focus:ring-stone-400 focus:border-stone-400 outline-none transition-all bg-white/80 backdrop-blur-sm shadow-sm placeholder:text-stone-300 serif-font"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!input.trim()}
                className={`w-full py-4 rounded-xl text-lg font-bold transition-all shadow-lg shadow-stone-200 flex items-center justify-center gap-2 ${
                  input.trim() 
                    ? 'bg-stone-800 text-white hover:bg-stone-700 active:scale-[0.98]' 
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                묵상 시작하기
              </button>
            </form>

            <div className="pt-8 border-t border-stone-200">
              <p className="text-center text-xs text-stone-400 italic">
                "주의 말씀은 내 발에 등이요 내 길에 빛이니이다" (시 119:105)
              </p>
            </div>
          </div>
        )}

        {status === AppStatus.LOADING && <LoadingState />}

        {status === AppStatus.ERROR && (
          <div className="max-w-md mx-auto p-8 bg-red-50 rounded-2xl border border-red-100 text-center space-y-4">
            <div className="text-red-500 text-4xl">⚠️</div>
            <p className="text-red-800 font-medium">{error}</p>
            <button 
              onClick={handleReset}
              className="px-6 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              다시 시도하기
            </button>
          </div>
        )}

        {status === AppStatus.SUCCESS && result && (
          <MeditationDisplay data={result} onReset={handleReset} />
        )}
      </main>

      <footer className="mt-auto py-12 text-center text-stone-400 text-xs font-light tracking-wide">
        &copy; {new Date().getFullYear()} GraceReflect. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
