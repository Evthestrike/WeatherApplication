import React from "react";
import _ from "underscore";
import DayForecast from "./DayForecast";
import Stack from "@mui/material/Stack";
import fiveDayForecastDataStore from "../../Global/FiveDayDataStore";
import { useDataStore } from "@bungie/datastore/DataStoreHooks";
import CircularProgress from "@mui/material/CircularProgress";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const WeekForecast = () => {
  const forecastData = useDataStore(fiveDayForecastDataStore);
  if (typeof forecastData.fiveDayForecast === "undefined") {
    return <CircularProgress />;
  } else {
    return (
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={0}
        flexWrap="wrap"
      >
        {_.map(forecastData.fiveDayForecast.days, (day, index) => (
          <DayForecast key={index} day={day} index={index} />
        ))}
      </Stack>
    );
  }
};

export default WeekForecast;
