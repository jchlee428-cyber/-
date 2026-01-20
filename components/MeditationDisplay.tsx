
import React from 'react';
import { MeditationResult } from '../types';

interface Props {
  data: MeditationResult;
  onReset: () => void;
}

const MeditationDisplay: React.FC<Props> = ({ data, onReset }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in duration-1000 pb-20">
      {/* 1. Verse */}
      <section className="bg-stone-100/50 p-10 rounded-3xl border border-stone-200 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-stone-300"></div>
        <h2 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-6">Holy Scripture</h2>
        <p className="text-2xl md:text-3xl text-stone-800 serif-font leading-relaxed font-bold">
          {data.verse}
        </p>
      </section>

      {/* 2. Mentor's Wisdom (Specific Situation) */}
      <section className="bg-white p-10 rounded-3xl shadow-sm border border-stone-100 border-t-amber-400 border-t-4">
        <div className="flex items-center gap-2 mb-6">
            <span className="p-1.5 bg-amber-100 rounded-full text-amber-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/></svg>
            </span>
            <h2 className="text-sm font-bold text-stone-500 uppercase tracking-widest">영성 멘토의 한마디</h2>
        </div>
        <div className="text-stone-800 leading-loose text-lg serif-font italic">
          "{data.mentorWisdom}"
        </div>
      </section>

      {/* 3. Meditation */}
      <section className="px-4">
        <h2 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-6">묵상 (Meditation)</h2>
        <div className="text-stone-700 leading-loose text-lg whitespace-pre-line serif-font border-l-2 border-stone-100 pl-8">
          {data.meditation}
        </div>
      </section>

      {/* 4. Application */}
      <section className="bg-stone-50 p-8 rounded-2xl">
        <h2 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">오늘의 삶으로 (Application)</h2>
        <div className="text-stone-700 leading-relaxed whitespace-pre-line">
          {data.application}
        </div>
      </section>

      {/* 5. Prayer */}
      <section className="relative py-12 px-10 bg-white shadow-sm border border-stone-100 rounded-[3rem] text-center">
        <h2 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-6">개인 기도 (Personal Prayer)</h2>
        <p className="text-stone-800 serif-font text-xl italic leading-relaxed px-4">
          "{data.prayer}"
        </p>
      </section>

      {/* Intercessory Prayer */}
      <section className="pt-16 border-t border-stone-200">
        <div className="flex flex-col items-center gap-2 mb-10">
            <h2 className="text-sm font-bold text-stone-500 uppercase tracking-widest">Intercessory Prayer</h2>
            <p className="text-stone-400 text-xs">중보기도팀을 위한 간구</p>
        </div>
        <div className="bg-stone-900 text-stone-300 p-12 rounded-[2.5rem] shadow-2xl leading-loose whitespace-pre-line serif-font italic text-lg relative">
            <div className="absolute top-6 left-10 opacity-20">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.154c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
            </div>
          {data.intercessoryPrayer}
        </div>
      </section>

      <div className="flex justify-center pt-10">
        <button 
          onClick={onReset}
          className="px-10 py-4 bg-stone-800 text-stone-100 hover:bg-stone-700 rounded-full transition-all text-sm font-medium tracking-widest shadow-lg shadow-stone-200"
        >
          마침 (RETURN TO START)
        </button>
      </div>
    </div>
  );
};

export default MeditationDisplay;
