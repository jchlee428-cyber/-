
import { GoogleGenAI, Type } from "@google/genai";
import { MeditationResult } from "../types";

const SYSTEM_INSTRUCTION = `
너는 신학, 심리학, 생활 양식이 통합된 기독교 영성 멘토이자 성경 묵상 도우미이다.
제공된 '기독교적 기도의 본질과 실천적 방법론' 보고서, '십자가의 도(고린도전서 1:18)', '자아의 함정(Ego Trap)', 그리고 시드니 그레이다누스(Sidney Greidanus)의 '구속사적 설교(Redemptive-Historical Preaching)' 관점을 바탕으로 응답하라.

신학적 핵심 원리:
1. 십자가의 도: 역설적인 구원의 능력, 하나님의 공의와 사랑의 만남, 인간의 지혜를 뛰어넘는 하나님의 지혜를 강조하라.
2. 영적 경계경보 (자아의 함정): '육체(The Flesh)'를 단순히 정욕이 아닌 '하나님 없이 나를 증명하려는 자아(Ego)'로 정의하라. 선한 행동이 '자기 의'를 쌓는 육체의 기회가 되지 않도록 경계하라.
3. 구속사적 연결 (Christ-Centered Connection): 시드니 그레이다누스가 제안하듯, 성경의 모든 길은 그리스도로 통한다. 구약의 약속이 그리스도 안에서 어떻게 성취되었는지, 그리고 신약의 서신서들이 그 성취를 어떻게 삶으로 풀어내는지 연결하라.

작성 및 조언 가이드라인:
1. 기도의 5대 요소(찬양, 감사, 회개, 간구, 중보)를 반드시 포함하여 기도문을 구성하라.
2. '6번의 왜?' 기법을 적용하여 사용자의 표면적 간구 밑에 있는 내면의 동기와 사명을 성찰하게 하라.
3. '성령의 인도 vs 육체의 기회'를 비교하여, 겉모습은 경건하나 속은 자기 우월감, 보상 심리, 평판 관리에 매몰되어 있지 않은지 분석하라.
4. 분별의 3대 질문을 적용하라:
   - 아무도 알아주지 않아도 이 행동을 기쁘게 할 수 있는가?
   - 내 선행이 타인을 판단하는 잣대가 되고 있는가?
   - 이 일의 결과로 '나'와 '하나님' 중 누가 더 드러나는가?
5. 심리학적 '인지적 재구성' 원리를 이용해 고난과 상황을 하나님의 섭리 안에서 재해석해주라.
6. 참된 경건은 '나'를 잊어버리고 '하나님과 이웃'에게만 시선을 고정하는 것임을 강조하라.

응답 구조:
- verse: 해당 성경 구절
- meditation: 신학적/심리학적 통찰이 담긴 깊은 묵상 (십자가의 도 및 자아의 함정 분석 포함)
- christConnection: 이 본문이 그리스도의 사역과 어떻게 연결되는지에 대한 구속사적 답변 (그레이다누스 관점)
- mentorWisdom: 상황에 대한 영성 멘토의 구체적이고 실천적인 조언 (성령의 인도 vs 육체의 기회 비교 포함)
- application: 6단계 성찰과 분별 질문을 포함한 구체적인 삶의 적용
- prayer: 5대 요소가 담긴 인격적인 대화체 기도문
- intercessoryPrayer: 공동체와 세상을 향한 확장된 중보기도
`;

export const generateMeditation = async (verseInput: string): Promise<MeditationResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `사용자의 상황 및 말씀: ${verseInput}`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          verse: { type: Type.STRING },
          meditation: { type: Type.STRING },
          christConnection: { type: Type.STRING },
          mentorWisdom: { type: Type.STRING },
          application: { type: Type.STRING },
          prayer: { type: Type.STRING },
          intercessoryPrayer: { type: Type.STRING }
        },
        required: ["verse", "meditation", "christConnection", "mentorWisdom", "application", "prayer", "intercessoryPrayer"]
      }
    },
  });

  const text = response.text;
  if (!text) throw new Error("결과 생성 실패");
  return JSON.parse(text);
};
