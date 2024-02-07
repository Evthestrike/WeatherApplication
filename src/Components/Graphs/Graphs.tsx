import React, { useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Day } from "../../GetForecast";
import TemperatureDisplay from "./TemperatureDisplay/TemperatureDisplay";
import PrecipitationDisplay from "./PrecipitationDisplay/PrecipitationDisplay";
import WindDisplay from "./WindDisplay/WindDisplay";

enum TabOptions {
  Temperature = "TEMPERATURE",
  Precipitation = "PRECIPITATION",
  Wind = "WIND",
}

const Graphs = () => {
  const [selected, setSelected] = useState(TabOptions.Temperature);

  const handleChange = (
    event: React.SyntheticEvent,
    newSelected: TabOptions
  ) => {
    setSelected(newSelected);
  };

  return (
    <TabContext value={selected}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleChange}>
          <Tab label="Temperature" value={TabOptions.Temperature} />
          <Tab label="Precipitation" value={TabOptions.Precipitation} />
          <Tab label="Wind" value={TabOptions.Wind} />
        </TabList>
      </Box>
      <TabPanel value={TabOptions.Temperature}>
        <TemperatureDisplay />
      </TabPanel>
      <TabPanel value={TabOptions.Precipitation}>
        <PrecipitationDisplay />
      </TabPanel>
      <TabPanel value={TabOptions.Wind}>
        <WindDisplay />
      </TabPanel>
    </TabContext>
  );
};

export default Graphs;
