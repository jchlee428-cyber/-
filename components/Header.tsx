
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 px-4 text-center">
      <div className="inline-block border-b border-stone-300 pb-2 mb-2">
        <h1 className="text-3xl md:text-4xl font-bold text-stone-800 serif-font tracking-tight">
          GraceReflect
        </h1>
      </div>
      <p className="text-stone-500 font-light tracking-widest text-sm uppercase">
        은혜의 묵상과 영적 멘토링
      </p>
    </header>
  );
};

export default Header;
