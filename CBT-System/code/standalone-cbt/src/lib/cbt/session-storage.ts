"use client";

const tokenKey = (examId: string) => `cbt-token:${examId}`;
const resultKey = (examId: string) => `cbt-result:${examId}`;

export function getStudentToken(examId: string) {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(tokenKey(examId));
}

export function setStudentToken(examId: string, token: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(tokenKey(examId), token);
}

export function clearStudentToken(examId: string) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(tokenKey(examId));
}

export function setStudentResult(examId: string, result: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(resultKey(examId), JSON.stringify(result));
}

export function getStudentResult<T>(examId: string) {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(resultKey(examId));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}
