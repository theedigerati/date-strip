import React, { useState, createContext, useCallback, useContext } from "react";

type ScrollContextType = {
  canScrollLeft: boolean;
  canScrollRight: boolean;
  handleScrollEvent: (event: React.UIEvent<HTMLDivElement>) => void;
  handleNavScroll: (
    positoion: "left" | "right",
    ref: React.RefObject<HTMLElement>
  ) => void;
  handleScrollContentChange: (ref: React.RefObject<HTMLElement>) => void;
};

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

const ScrollProvider = (children: React.ReactNode) => {
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

  const handleScrollEvent = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const element = event.currentTarget;
      if (element.scrollLeft < element.scrollWidth) {
        setCanScrollRight(true);
      }
      if (element.scrollLeft === element.scrollWidth - element.clientWidth) {
        setCanScrollRight(false);
      }

      if (element.scrollLeft > 0) {
        setCanScrollLeft(true);
      } else {
        setCanScrollLeft(false);
      }
    },
    []
  );

  const handleNavScroll = useCallback(
    (position: "left" | "right", ref: React.RefObject<HTMLElement>) => {
      if (ref.current != null) {
        const element = ref.current;
        if (position === "right") {
          const scrollDiff = element.scrollWidth - element.clientWidth;
          element.scrollTo({ left: scrollDiff });
        } else {
          element.scrollTo({ left: 0 });
        }
      }
    },
    []
  );

  const handleScrollContentChange = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current != null) {
      const element = ref.current;
      if (element.scrollWidth > element.clientWidth) {
        setCanScrollRight(true);
      } else {
        setCanScrollRight(false);
      }
    }
  };

  const value = {
    canScrollLeft,
    canScrollRight,
    handleScrollEvent,
    handleNavScroll,
    handleScrollContentChange
  };

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
};

function useScroll() {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
}

export { ScrollProvider, useScroll };
