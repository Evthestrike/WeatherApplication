import { ToggleButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import React from "react";
import { useDataStore } from "@bungie/datastore/DataStoreHooks";
import { Forecast } from "../../../GetForecast";
import fiveDayForecastDataStore from "../../../Global/FiveDayDataStore";

interface Props {
  forecast: Forecast;
  index: number;
}

const TemperatureItem = ({ forecast, index }: Props) => {
  const forecastData = useDataStore(fiveDayForecastDataStore);
  return (
    <ToggleButton
      sx={{ border: 0 }}
      value={index}
      selected={index === forecastData.displayedForecastIndex}
      onChange={() => {
        fiveDayForecastDataStore.actions.setDisplayedForecastIndex(index);
      }}
    >
      <Container className="temperature-item">
        <Typography variant="h4" component="p">
          {forecast.temp}&deg;
        </Typography>
        <Typography variant="caption" component="p">
          {
            {
              1: "1 am",
              2: "2 am",
              3: "3 am",
              4: "4 am",
              5: "5 am",
              6: "6 am",
              7: "7 am",
              8: "8 am",
              9: "9 am",
              10: "10 am",
              11: "11 am",
              12: "12 pm",
              13: "1 pm",
              14: "2 pm",
              15: "3 pm",
              16: "4 pm",
              17: "5 pm",
              18: "6 pm",
              19: "7 pm",
              20: "8 pm",
              21: "9 pm",
              22: "10 pm",
              23: "11 pm",
              24: "12 am",
            }[forecast.dt.getHours()]
          }
        </Typography>
      </Container>
    </ToggleButton>
  );
};

export default TemperatureItem;
