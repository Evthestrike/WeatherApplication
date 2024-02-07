import React from "react";
import { useDataStore } from "@bungie/datastore/DataStoreHooks";
import fiveDayForecastDataStore from "../../Global/FiveDayDataStore";
import { Stack, Box, CircularProgress, Typography } from "@mui/material";

const ForecastDisplay = () => {
  const forecastData = useDataStore(fiveDayForecastDataStore);
  if (typeof forecastData.fiveDayForecast === "undefined") {
    return <CircularProgress />;
  } else {
    const day =
      forecastData.fiveDayForecast.days[forecastData.displayedDayIndex];
    const forecast = day.forecasts[forecastData.displayedForecastIndex];
    return (
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <img
              src={`WeatherIcons/${forecast.weather.icon}.png`}
              alt="Weather Icon"
            />
            <Typography variant="h2" component="p">
              {forecast.temp} &deg;F
            </Typography>
            <Stack
              direction="column"
              justifyContent="space-between"
              sx={{ marginLeft: 2 }}
            >
              <Typography variant="caption" component="p">
                Precipitation: {forecast.pop}%
              </Typography>
              <Typography variant="caption" component="p">
                Humidity: {forecast.humidity}%
              </Typography>
              <Typography variant="caption" component="p">
                Wind: {forecast.wind.speed} mph
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Typography variant="h6" component="h1">
            {forecastData.fiveDayForecast.city.name},{" "}
            {forecastData.fiveDayForecast.city.country}
          </Typography>
          <Typography variant="body1" component="h2">
            {day.dayOfWeek}{" "}
            {
              {
                1: "1:00 AM",
                2: "2:00 AM",
                3: "3:00 AM",
                4: "4:00 AM",
                5: "5:00 AM",
                6: "6:00 AM",
                7: "7:00 AM",
                8: "8:00 AM",
                9: "9:00 AM",
                10: "10:00 AM",
                11: "11:00 AM",
                12: "12:00 PM",
                13: "1:00 PM",
                14: "2:00 PM",
                15: "3:00 PM",
                16: "4:00 PM",
                17: "5:00 PM",
                18: "6:00 PM",
                19: "7:00 PM",
                20: "8:00 PM",
                21: "9:00 PM",
                22: "10:00 PM",
                23: "11:00 PM",
                24: "12:00 AM",
              }[forecast.dt.getHours()]
            }
          </Typography>
          <Typography variant="body1" component="h2">
            {forecast.weather.description}
          </Typography>
        </Stack>
      </Stack>
    );
  }
};

export default ForecastDisplay;
