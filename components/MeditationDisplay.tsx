
import React, { useState } from 'react';
import { MeditationResult } from '../types';

interface Props {
  data: MeditationResult;
  onReset: () => void;
}

const MeditationDisplay: React.FC<Props> = ({ data, onReset }) => {
  const [copied, setCopied] = useState(false);

  const getFormattedContent = () => {
    return `
[말씀]
${data.verse}

[그리스도 중심적 연결]
${data.christConnection}

[영성 멘토의 조언]
${data.mentorWisdom}

[묵상 (Meditation)]
${data.meditation}

[영적 성찰과 적용]
${data.application}

[하나님과의 대화]
${data.prayer}

[공동체를 위한 거룩한 간구]
${data.intercessoryPrayer}

-- GraceReflect: 은혜의 묵상과 영적 멘토링 --
    `.trim();
  };

  const handleCopyAll = async () => {
    const textToCopy = getFormattedContent();
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('복사에 실패했습니다. 직접 선택하여 복사해주세요.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-16 animate-in fade-in duration-1000 pb-20 relative">
      {/* Utility Actions (Copy) */}
      <div className="sticky top-4 z-10 flex justify-end items-center px-4 pointer-events-none">
        <button 
          onClick={handleCopyAll}
          className={`pointer-events-auto flex items-center gap-2 px-5 py-2.5 rounded-full shadow-lg transition-all transform active:scale-95 ${
            copied 
              ? 'bg-emerald-500 text-white' 
              : 'bg-white/90 backdrop-blur text-stone-700 hover:bg-stone-800 hover:text-white border border-stone-200'
          }`}
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-xs font-bold">복사 완료!</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              <span className="text-xs font-bold">전체 내용 복사</span>
            </>
          )}
        </button>
      </div>

      {/* 1. Verse */}
      <section className="bg-stone-100/40 p-12 rounded-[3rem] border border-stone-200 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-stone-200 via-stone-400 to-stone-200"></div>
        <h2 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em] mb-8">Holy Scripture</h2>
        <p className="text-2xl md:text-3xl text-stone-800 serif-font leading-relaxed font-bold px-4">
          {data.verse}
        </p>
      </section>

      {/* 2. Mentor's Wisdom (Specific Situation) */}
      <section className="bg-white p-12 rounded-[2.5rem] shadow-xl shadow-stone-100/50 border border-stone-100 border-t-amber-400 border-t-4 relative">
        <div className="absolute -top-4 left-12 px-4 py-1 bg-amber-400 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
            The Wisdom
        </div>
        <div className="flex items-center gap-3 mb-8">
            <span className="p-2 bg-amber-50 rounded-full text-amber-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/></svg>
            </span>
            <h2 className="text-sm font-bold text-stone-600 uppercase tracking-widest">영성 멘토의 조언</h2>
        </div>
        <div className="text-stone-800 leading-[2.1] text-lg serif-font italic">
          "{data.mentorWisdom}"
        </div>
      </section>

      {/* 3. Meditation */}
      <section className="px-6">
        <div className="flex items-center gap-4 mb-8">
            <h2 className="text-xs font-bold text-stone-400 uppercase tracking-[0.2em]">묵상 (Meditation)</h2>
            <div className="h-px flex-grow bg-stone-100"></div>
        </div>
        <div className="text-stone-700 leading-[2.2] text-lg whitespace-pre-line serif-font border-l-4 border-stone-100 pl-10">
          {data.meditation}
        </div>
      </section>

      {/* Christ Connection */}
      <section className="bg-amber-50/30 p-12 rounded-[3rem] border border-amber-100 relative">
        <div className="absolute -top-3 right-12 px-4 py-1 bg-stone-800 text-white text-[9px] font-bold uppercase tracking-widest rounded-full">
            Redemptive-Historical
        </div>
        <h2 className="text-xs font-bold text-amber-800 uppercase tracking-widest mb-6 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0z"/></svg>
            그리스도 중심적 연결
        </h2>
        <div className="text-stone-800 leading-[2.0] text-lg serif-font">
          {data.christConnection}
        </div>
      </section>

      {/* 4. Application */}
      <section className="bg-stone-800 text-stone-100 p-12 rounded-[3rem] shadow-2xl">
        <h2 className="text-[10px] font-black text-stone-500 uppercase tracking-[0.3em] mb-8">영적 성찰과 적용 (6-Whys)</h2>
        <div className="text-stone-300 leading-relaxed whitespace-pre-line text-base font-light">
          {data.application}
        </div>
      </section>

      {/* 5. Prayer */}
      <section className="relative py-16 px-12 bg-white shadow-sm border border-stone-100 rounded-[4rem] text-center overflow-hidden">
         <div className="absolute top-0 right-0 p-8 opacity-5">
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
         </div>
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {['찬양', '감사', '회개', '간구'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-stone-50 text-stone-400 text-[9px] font-bold rounded-full border border-stone-100 uppercase tracking-tighter">#{tag}</span>
            ))}
        </div>
        <h2 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-10">하나님과의 대화</h2>
        <p className="text-stone-800 serif-font text-2xl italic leading-[1.8] px-4">
          "{data.prayer}"
        </p>
      </section>

      {/* Intercessory Prayer */}
      <section className="pt-20">
        <div className="flex flex-col items-center gap-3 mb-12">
            <div className="w-12 h-1 bg-amber-200 rounded-full mb-2"></div>
            <h2 className="text-sm font-black text-stone-500 uppercase tracking-[0.4em]">Intercession</h2>
            <p className="text-stone-400 text-xs italic">공동체를 위한 거룩한 간구</p>
        </div>
        <div className="bg-stone-50 text-stone-600 p-12 rounded-[3rem] border border-stone-200 leading-[2.2] whitespace-pre-line serif-font italic text-lg relative">
          {data.intercessoryPrayer}
        </div>
      </section>

      <div className="flex justify-center pt-10 pb-20 gap-4">
        <button 
          onClick={handleCopyAll}
          className="px-10 py-5 bg-white border-2 border-stone-200 text-stone-700 hover:bg-stone-50 rounded-2xl transition-all text-xs font-bold tracking-[0.3em] shadow-xl active:scale-95 flex items-center gap-2"
        >
          {copied ? '복사 완료!' : '내용 복사'}
        </button>
        <button 
          onClick={onReset}
          className="px-14 py-5 bg-stone-900 text-stone-100 hover:bg-stone-800 rounded-2xl transition-all text-xs font-bold tracking-[0.3em] shadow-2xl active:scale-95"
        >
          마침 (RETURN TO START)
        </button>
      </div>
    </div>
  );
};

export default MeditationDisplay;
