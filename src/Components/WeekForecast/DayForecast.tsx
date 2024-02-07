import { ToggleButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import React from "react";
import { Day } from "../../GetForecast";
import fiveDayForecastDataStore from "../../Global/FiveDayDataStore";
import { useDataStore } from "@bungie/datastore/DataStoreHooks";

interface Props {
  day: Day;
  index: number;
}

const DayForecast = ({ day, index }: Props) => {
  const forecastData = useDataStore(fiveDayForecastDataStore);
  return (
    <ToggleButton
      sx={{ border: 0 }}
      value={index}
      selected={index === forecastData.displayedDayIndex}
      onChange={() => {
        fiveDayForecastDataStore.actions.setDisplayedDayIndex(index);
        fiveDayForecastDataStore.actions.setDisplayedForecastIndex(0);
      }}
    >
      <Container className="weather-card">
        <Typography variant="h5" component="h2">
          {day.dayOfWeek}
        </Typography>

        <img
          src={`WeatherIcons/${day.avgWeatherIcon}.png`}
          alt="Weather Icon"
          width="100"
          height="100"
        />

        <Typography variant="body1" component="p">
          {day.maxTemp}&deg;&nbsp;
          <span style={{ color: "gray" }}>{day.minTemp}&deg;</span>
        </Typography>
      </Container>
    </ToggleButton>
  );
};

export default DayForecast;
