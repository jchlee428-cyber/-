
import React, { useState } from 'react';
import Header from './components/Header';
import LoadingState from './components/LoadingState';
import MeditationDisplay from './components/MeditationDisplay';
import PrayerGuide from './components/PrayerGuide';
import { generateMeditation } from './services/geminiService';
import { MeditationResult, AppStatus } from './types';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [result, setResult] = useState<MeditationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showGuide, setShowGuide] = useState(false);

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col min-h-screen">
      <Header />

      <main className="mt-4 flex-grow">
        {status === AppStatus.IDLE && (
          <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-stone-800 serif-font">
                오늘의 말씀과 고민을 입력하세요
              </h3>
              <p className="text-stone-500 font-light">
                마음속에 머무는 구절이나 중보기도팀의 고민 등 삶의 정황을 기록해주세요.
              </p>
            </div>

            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="예: 갈라디아서 5:13 - 중보기도팀원들이 자리 양보 문제로 자유하지 못하고 있습니다..."
                  className="w-full min-h-[180px] p-8 text-lg border-2 border-stone-200 rounded-[2rem] focus:ring-2 focus:ring-stone-400 focus:border-stone-400 outline-none transition-all bg-white/80 backdrop-blur-sm shadow-sm placeholder:text-stone-300 serif-font leading-relaxed"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className={`flex-grow py-5 rounded-2xl text-lg font-bold transition-all shadow-xl shadow-stone-200 flex items-center justify-center gap-2 ${
                    input.trim() 
                      ? 'bg-stone-800 text-white hover:bg-stone-700 active:scale-[0.98]' 
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  묵상 및 조언 생성
                </button>
                
                <button
                  type="button"
                  onClick={() => setShowGuide(true)}
                  className="px-8 py-5 bg-white border-2 border-stone-200 text-stone-600 rounded-2xl font-bold hover:bg-stone-50 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.99 7.99 0 0111 4c1.068 0 2.082.209 3 .588V13c-1.299-.733-2.735-1-4-1-1.265 0-2.541.267-3.66.753V4.804zM3.181 5.162A3 3 0 014.225 4c1.232 0 2.446.351 3.52 1.002L8 5.143v8.658l-.136-.082A8.954 8.954 0 005 13c-1.121 0-2.253.214-3.32.61a1 1 0 01-1.18-.735V5.91a3 3 0 012.681-2.748zM10 11c1.265 0 2.541.267 3.66.753V5.143l-.255-.155A7.99 7.99 0 0111 4c-1.068 0-2.082.209-3 .588v8.412a8.954 8.954 0 013-1z"/></svg>
                  기도 가이드
                </button>
              </div>
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
          <div className="max-w-md mx-auto p-12 bg-red-50 rounded-[2rem] border border-red-100 text-center space-y-6">
            <div className="text-red-500 text-5xl">⚠️</div>
            <p className="text-red-800 font-medium leading-relaxed">{error}</p>
            <button 
              onClick={handleReset}
              className="px-8 py-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors font-bold"
            >
              다시 시도하기
            </button>
          </div>
        )}

        {status === AppStatus.SUCCESS && result && (
          <MeditationDisplay data={result} onReset={handleReset} />
        )}
      </main>

      {showGuide && <PrayerGuide onClose={() => setShowGuide(false)} />}

      <footer className="py-12 text-center text-stone-400 text-xs font-light tracking-wide border-t border-stone-100/50 mt-10">
        <p className="mb-2 uppercase tracking-widest">GraceReflect Spiritual Sanctuary</p>
        <p>&copy; {new Date().getFullYear()} Designed for Spiritual Growth and Professional Prayer Practice.</p>
      </footer>
    </div>
  );
};

export default App;
