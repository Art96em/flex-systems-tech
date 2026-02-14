import { memo } from "react";

import { Tab, Tabs } from "@mui/material";

const MoviesTabs = memo(
  ({ tabs, activeTabIndex, onTabChange, onTabFocus, onTabBlur, tabsRef }) => {
    return (
      <Tabs
        ref={tabsRef}
        value={activeTabIndex}
        onChange={onTabChange}
        sx={{
          "& .MuiTab-root": {
            "&:hover": {
              color: "#ff9800",
            },

            "&.Mui-focusVisible": {
              backgroundColor: "#b0bec5",
              outline: "0",
              color: "#ff9800",
            },
          },

          "& .MuiTabs-indicator": {
            backgroundColor: "#ff9800",
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            disableRipple
            key={tab.value}
            label={tab.label}
            onFocus={(e) => {
              if (e.target.matches(":focus-visible")) {
                onTabFocus(index);
              }
            }}
            onMouseEnter={() => {
              onTabFocus(index);
            }}
            onBlur={onTabBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onTabBlur();
              }
            }}
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#ff9800",
                height: 3,
              },
            }}
          />
        ))}
      </Tabs>
    );
  },
);

export default MoviesTabs;
