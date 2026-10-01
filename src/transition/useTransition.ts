import { useContext } from "react";
import { TransitionContext } from "./TransitionProvider";

export function useTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error(
      "useTransition must be used inside <TransitionProvider>",
    );
  }
  return ctx;
}