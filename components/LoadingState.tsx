
import React, { useState, useEffect } from 'react';

const messages = [
  "말씀의 깊은 곳으로 나아가고 있습니다...",
  "성령님의 도우심을 간구하고 있습니다...",
  "오늘 우리에게 주시는 하나님의 음성을 경청하고 있습니다...",
  "마음을 다해 묵상문을 준비하고 있습니다...",
];

const LoadingState: React.FC = () => {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIdx((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-6">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-stone-200 border-t-stone-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-6 h-6 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <p className="text-stone-600 serif-font italic transition-all duration-500">
        {messages[msgIdx]}
      </p>
    </div>
  );
};

export default LoadingState;
