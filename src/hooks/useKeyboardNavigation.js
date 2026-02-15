import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useMoviesData } from "./useMoviesData";
import { ZONES, TABS, CATEGORIES, CARD_PER_ROW } from "../helpers/constants";

export const useKeyboardNavigation = () => {
  const { movies, currentCategory } = useMoviesData();

  const [activeZone, setActiveZone] = useState(ZONES.SEARCH);
  const [activeIndex, setActiveIndex] = useState(0);
  const tabsRef = useRef(null);
  const searchRef = useRef(null);
  const gridRef = useRef(null);
  const paginationRef = useRef(null);
  const activeTabIndex = useMemo(() => {
    return TABS.find((tab) => tab.value === currentCategory)?.order ?? 0;
  }, [currentCategory]);

  const getMaxIndex = useCallback(() => {
    if (activeZone === ZONES.GRID) return movies.length - 1;

    if (activeZone === ZONES.PAGINATION) {
      return (
        paginationRef.current?.querySelectorAll('[type="button"]').length - 1 ||
        0
      );
    }

    return 0;
  }, [movies.length, activeZone]);

  const moveRight = () => {
    setActiveIndex((prev) => Math.min(prev + 1, getMaxIndex()));
  };

  const moveLeft = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  const moveDownInGrid = () => {
    setActiveIndex((prev) => {
      const next = prev + CARD_PER_ROW;

      if (next >= movies.length) {
        if (currentCategory !== CATEGORIES.FAVORITES) {
          setActiveZone(ZONES.PAGINATION);
          return 1;
        }
        return prev;
      }

      return next;
    });
  };

  const moveUpInGrid = () => {
    setActiveIndex((prev) => {
      const next = prev - CARD_PER_ROW;

      if (next < 0) {
        setActiveZone(ZONES.SEARCH);
        return 0;
      }

      return next;
    });
  };

  const transitions = {
    [ZONES.TABS]: {
      ArrowDown: () => setActiveZone(ZONES.SEARCH),
    },

    [ZONES.SEARCH]: {
      ArrowDown: () => {
        setActiveZone(ZONES.GRID);
        setActiveIndex(0);
      },
      ArrowUp: () => {
        setActiveZone(ZONES.TABS);
      },
    },

    [ZONES.GRID]: {
      ArrowDown: moveDownInGrid,
      ArrowUp: moveUpInGrid,
      ArrowRight: moveRight,
      ArrowLeft: moveLeft,
    },

    [ZONES.PAGINATION]: {
      ArrowUp: () => {
        setActiveZone(ZONES.GRID);
        setActiveIndex(Math.max(movies.length - CARD_PER_ROW, 0));
      },
      ArrowRight: moveRight,
      ArrowLeft: moveLeft,
    },
  };

  const handleKeyDown = useCallback(
    (e) => {
      const action = transitions[activeZone]?.[e.key];

      action?.();
    },
    [transitions, activeZone],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (activeZone === ZONES.GRID) {
      const el = gridRef.current?.querySelector(
        `[data-index="${activeIndex}"]`,
      );
      el?.focus();
      el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      return;
    }

    if (activeZone === ZONES.TABS) {
      const tab =
        tabsRef.current?.querySelectorAll('[role="tab"]')[activeIndex];
      tab?.focus();
      return;
    }

    if (activeZone === ZONES.PAGINATION) {
      const btn =
        paginationRef.current?.querySelectorAll('[type="button"]')[activeIndex];
      btn?.focus();
      return;
    }

    if (activeZone === ZONES.SEARCH) {
      searchRef.current?.focus();
    }
  }, [activeZone, activeIndex]);

  return {
    gridRef,
    tabsRef,
    paginationRef,
    searchRef,
    movies,
    activeTabIndex,
  };
};
