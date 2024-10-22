export const SET_QUESTIONS = "question/SET_QUESTIONS";

export function setupQuestions(payload) {
  return {
    type: SET_QUESTIONS,
    payload,
  };
}