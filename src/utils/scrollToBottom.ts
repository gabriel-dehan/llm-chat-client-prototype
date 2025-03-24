import { RefObject } from "react";

export const scrollToBottom = (container: RefObject<HTMLElement | null>) => {
  if (container?.current) {
    container.current.scrollTop = container.current.scrollHeight;
  }
};
