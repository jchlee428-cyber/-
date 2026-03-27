
import React from 'react';

const PrayerGuide: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-[2rem] shadow-2xl p-8 md:p-12 relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-8 text-stone-400 hover:text-stone-800 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="space-y-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-stone-800 serif-font mb-2">기도의 본질과 실천 가이드</h2>
            <p className="text-stone-500 text-sm tracking-widest uppercase">Professional Prayer Methodology</p>
          </div>

          <section>
            <h3 className="text-lg font-bold text-stone-700 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-stone-100 rounded flex items-center justify-center text-xs">01</span>
              기도의 5대 요소 (ACTS+)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {[
                { title: '찬양 (Adoration)', desc: '하나님의 성품과 거룩함을 높임' },
                { title: '감사 (Thanksgiving)', desc: '일상의 축복과 은혜에 응답' },
                { title: '회개 (Confession)', desc: '자신의 허물을 인정하고 관계 회복' },
                { title: '간구 (Petition)', desc: '개인의 필요를 하나님의 뜻 안에서 요청' },
                { title: '중보 (Intercession)', desc: '타인과 공동체를 위한 대리적 기도' },
              ].map((item) => (
                <div key={item.title} className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <p className="font-bold text-stone-800">{item.title}</p>
                  <p className="text-stone-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold text-stone-700 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-stone-100 rounded flex items-center justify-center text-xs">02</span>
              심리학적 & 뇌과학적 효용
            </h3>
            <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 space-y-3 text-stone-700 text-sm leading-relaxed">
              <p>• <strong>인지적 재구성:</strong> 상황을 자신의 좁은 시각이 아닌 하나님의 섭리로 재해석하여 스트레스를 완화합니다.</p>
              <p>• <strong>정서 조절:</strong> 불안을 신뢰로 승화시키며 편도체의 과잉 활동을 억제하고 회복탄력성을 길러줍니다.</p>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold text-stone-700 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-stone-100 rounded flex items-center justify-center text-xs">03</span>
              성숙한 기도를 위한 전략
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-stone-800 text-white rounded-full flex items-center justify-center font-serif">6W</div>
                <div>
                  <h4 className="font-bold text-stone-800 italic">"왜?" 6단계 성찰</h4>
                  <p className="text-stone-600 text-sm">표면적 간구 밑에 숨겨진 정욕을 발견하고, 그것을 사명으로 전환하는 과정입니다.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-stone-200 text-stone-800 rounded-full flex items-center justify-center font-serif">G</div>
                <div>
                  <h4 className="font-bold text-stone-800 italic">겟세마네의 영성</h4>
                  <p className="text-stone-600 text-sm">"내 원대로 마옵시고 아버지의 원대로 하옵소서" - 자신의 뜻을 하나님의 거대한 통치에 굴복시키는 단계입니다.</p>
                </div>
              </div>
            </div>
          </section>

          <div className="pt-6">
            <button 
              onClick={onClose}
              className="w-full py-4 bg-stone-800 text-white rounded-2xl font-bold hover:bg-stone-700 transition-all"
            >
              가이드 닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerGuide;
