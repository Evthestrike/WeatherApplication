import { getDataStoreBuilder } from "@bungie/datastore/DataStore";
import { FiveDayForecast } from "../GetForecast";

interface FiveDayForecastDataStorePayload {
  fiveDayForecast: FiveDayForecast | undefined;
  displayedDayIndex: number;
  displayedForecastIndex: number;
}

const fiveDayForecastDataStore =
  getDataStoreBuilder<FiveDayForecastDataStorePayload>().build({
    actions: {
      setFiveDayForecast: (state, newFiveDayForecast: FiveDayForecast) => ({
        fiveDayForecast: newFiveDayForecast,
      }),
      setDisplayedDayIndex: (state, newIndex: number) => ({
        displayedDayIndex: newIndex,
      }),
      setDisplayedForecastIndex: (state, newIndex: number) => ({
        displayedForecastIndex: newIndex,
      }),
    },
    initialState: {
      fiveDayForecast: undefined,
      displayedDayIndex: 0,
      displayedForecastIndex: 0,
    },
  });

export default fiveDayForecastDataStore;
