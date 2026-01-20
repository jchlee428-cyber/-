
import { GoogleGenAI, Type } from "@google/genai";
import { MeditationResult } from "../types";

const SYSTEM_INSTRUCTION = `
너는 기독교 영성 멘토이자 성경 묵상 도우미이다.
사용자가 제공하는 성경 구절과 상황(고민)을 중심으로 깊이 있는 묵상문을 작성하라.

작성 가이드라인:
1. 말씀 본문의 핵심 의미를 해석한다.
2. 만약 사용자가 구체적인 상황(예: 자리 양보, 인간관계 등)을 제시했다면, 성경 구절과 그 상황을 직접적으로 연결하여 영적인 조언(mentorWisdom)을 제공하라.
3. 하나님이 오늘 공동체와 개인에게 주시는 메시지를 중심으로 묵상문을 쓴다.
4. 일상 속 적용점을 구체적으로 제시한다.
5. 짧은 개인 기도문을 작성한다.
6. 마지막으로 교회 중보기도팀을 위한 간절하고 풍성한 기도문으로 마무리한다.

전체적으로 경건하고 진솔하며, 하나님의 임재를 느끼게 하는 은혜로운 어조를 유지하라.
응답은 반드시 지정된 JSON 구조로 반환하라.
`;

export const generateMeditation = async (verseInput: string): Promise<MeditationResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `사용자의 묵상 요청: ${verseInput}`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          verse: { type: Type.STRING, description: "성경 구절 본문" },
          meditation: { type: Type.STRING, description: "본문의 영적 해석" },
          mentorWisdom: { type: Type.STRING, description: "사용자의 구체적 상황에 대한 멘토의 영적 조언" },
          application: { type: Type.STRING, description: "오늘의 삶 속 실천점" },
          prayer: { type: Type.STRING, description: "개인 기도문" },
          intercessoryPrayer: { type: Type.STRING, description: "중보기도 팀을 위한 기도문" }
        },
        required: ["verse", "meditation", "mentorWisdom", "application", "prayer", "intercessoryPrayer"],
        propertyOrdering: ["verse", "meditation", "mentorWisdom", "application", "prayer", "intercessoryPrayer"]
      }
    },
  });

  const resultStr = response.text;
  if (!resultStr) throw new Error("결과를 생성하지 못했습니다.");
  
  try {
    return JSON.parse(resultStr) as MeditationResult;
  } catch (e) {
    console.error("JSON parsing error:", e);
    throw new Error("응답 데이터 형식이 올바르지 않습니다.");
  }
};
