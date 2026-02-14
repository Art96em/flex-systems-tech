import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { ZONES, TABS } from "../helpers/constants";
import { useMoviesData } from "./useMoviesData";

export const useKeyboardNavigation = () => {
  const navigate = useNavigate();
  const { movies, currentCategory } = useMoviesData();

  const [activeZone, setActiveZone] = useState(ZONES.TABS);
  const [activeIndex, setActiveIndex] = useState(0);
  const tabsRef = useRef(null);
  const searchRef = useRef(null);
  const gridRef = useRef(null);
  const paginationRef = useRef(null);
  let activeTabIndex = TABS.find((tab) => tab.value == currentCategory).order;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        if (activeZone === ZONES.TABS) {
          setActiveZone(ZONES.SEARCH);
        } else if (activeZone === ZONES.SEARCH) {
          setActiveZone(ZONES.GRID);
          setActiveIndex(0);
        } else if (activeZone === ZONES.GRID) {
          setActiveIndex((prev) => {
            const nextIndex = prev + 4;

            if (nextIndex >= movies.length) {
              setActiveZone(ZONES.PAGINATION);
              return 1;
            }

            return nextIndex;
          });
        }
      }

      if (e.key === "ArrowUp") {
        if (activeZone === ZONES.PAGINATION) {
          setActiveZone(ZONES.GRID);
          setActiveIndex(Math.max(movies.length - 4, 0));
        } else if (activeZone === ZONES.GRID) {
          setActiveIndex((prev) => {
            const nextIndex = prev - 4;

            if (nextIndex < 0) {
              setActiveZone(ZONES.SEARCH);
              return 0;
            }

            return nextIndex;
          });
        } else {
          setActiveZone(ZONES.TABS);
        }
      }

      if (e.key === "ArrowRight") {
        if (activeZone !== ZONES.SEARCH)
          setActiveIndex((prev) =>
            Math.min(
              prev + 1,
              activeZone === ZONES.TABS
                ? 3
                : activeZone === ZONES.GRID
                  ? movies.length - 1
                  : paginationRef.current.querySelectorAll('[type="button"]')
                      .length - 1,
            ),
          );
      }

      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeZone, activeIndex, movies, paginationRef.current]);

  useEffect(() => {
    if (activeZone === ZONES.GRID) {
      const el = gridRef.current?.querySelector(
        `[data-index="${activeIndex}"]`,
      );

      if (el) {
        el.focus();

        el.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      }
    }
  }, [activeZone, activeIndex]);

  useEffect(() => {
    if (activeZone === ZONES.TABS && tabsRef.current) {
      const tabButtons = tabsRef.current.querySelectorAll('[role="tab"]');
      const currentTab = tabButtons[activeIndex];

      if (currentTab) {
        currentTab.focus();
      }
    }
  }, [activeIndex, activeZone]);

  useEffect(() => {
    if (activeZone === ZONES.PAGINATION && paginationRef.current) {
      const buttons = paginationRef.current.querySelectorAll('[type="button"]');

      const currentButton = buttons[activeIndex];

      if (currentButton) {
        currentButton.focus();
      }
    }
  }, [activeZone, activeIndex]);

  useEffect(() => {
    if (activeZone === ZONES.SEARCH && searchRef.current) {
      searchRef.current.focus();
    }
  }, [activeZone]);

  return {
    gridRef,
    tabsRef,
    paginationRef,
    searchRef,
    movies,
    activeTabIndex,
  };
};
