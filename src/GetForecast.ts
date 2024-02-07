import { off } from "process";
import _, { max } from "underscore";

interface FiveDayForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      }
    ];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    rain?: {
      "3h": number;
    };
    sys: {
      pod: string;
    };
    dt_txt: string;
  }[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface Forecast {
  dt: Date;
  temp: number;
  weather: {
    description: string;
    icon: string;
  };
  wind: {
    speed: number;
    deg: number;
  };
  pop: number;
  humidity: number;
}

export interface Day {
  dayOfWeek: string;
  maxTemp: number;
  minTemp: number;
  avgWeatherIcon: string;
  forecasts: Forecast[];
}

export interface FiveDayForecast {
  city: {
    name: string;
    country: string;
  };
  days: Day[];
}

const convertNumToDay = (stringNum: string) =>
  ({
    "0": "Sun",
    "1": "Mon",
    "2": "Tue",
    "3": "Wed",
    "4": "Thu",
    "5": "Fri",
    "6": "Sat",
  }[stringNum] || "Bad");

const getAvgWeatherIcon = (forecasts: Forecast[]): string => {
  const commonWeather = _.max(
    _.map(
      _.countBy(forecasts, forecast => forecast.weather.icon),
      (num, icon) => ({ icon: icon, num: num })
    ),
    x => x.num
  );
  return typeof commonWeather === "number" ? "01d" : commonWeather.icon;
};

const convertToFiveDayForecast = (
  response: FiveDayForecastResponse
): FiveDayForecast => {
  const forecasts: Forecast[] = _.map(response.list, forecastResponse => ({
    dt: new Date(forecastResponse.dt * 1000),
    temp: Math.round(forecastResponse.main.temp),
    weather: {
      description: forecastResponse.weather[0].main,
      icon: forecastResponse.weather[0].icon.replaceAll("n", "d"),
    },
    wind: {
      speed: Math.round(forecastResponse.wind.speed),
      deg: Math.round(forecastResponse.wind.deg),
    },
    pop: Math.round(forecastResponse.pop),
    humidity: forecastResponse.main.humidity,
  }));

  const groupedForecasts = _.groupBy(forecasts, forecast =>
    forecast.dt.getDay()
  );

  const days: Day[] = _.map(groupedForecasts, (dayForecasts, dayNum) => {
    return {
      dayOfWeek: convertNumToDay(dayNum),
      maxTemp: _.max(_.map(dayForecasts, forecast => forecast.temp)),
      minTemp: _.min(_.map(dayForecasts, forecast => forecast.temp)),
      avgWeatherIcon: getAvgWeatherIcon(dayForecasts),
      forecasts: _.sortBy(dayForecasts, forecast => forecast.dt.getTime()),
    };
  });

  return {
    city: {
      name: response.city.name,
      country: response.city.country,
    },
    days: _.sortBy(days, day => day.forecasts[0].dt.getTime()),
  };
};

interface FiveDayForecastQueryParams {
  lat: number;
  lon: number;
  mode?: "xml" | "html";
  cnt?: number;
  units?: "standard" | "metric" | "imperial";
  lang?: string;
}

const apiKey = "9783280f35e4e669d88d39ff3c07cabb";

const createFiveDayForecastURL = (queryParams: FiveDayForecastQueryParams) =>
  "https://api.openweathermap.org/data/2.5/forecast?" +
  `lat=${queryParams.lat}&lon=${queryParams.lon}` +
  ("mode" in queryParams ? `&mode=${queryParams.mode}` : "") +
  ("cnt" in queryParams ? `&cnt=${queryParams.cnt}` : "") +
  ("units" in queryParams ? `&units=${queryParams.units}` : "") +
  ("lang" in queryParams ? `&lang=${queryParams.lang}` : "") +
  `&appid=${apiKey}`;

export const getFiveDayForecast = async (
  queryParams: FiveDayForecastQueryParams
) => {
  const url = createFiveDayForecastURL(queryParams);
  const response = await fetch(url);
  if (response.ok) {
    const fiveDayForecastResponse: FiveDayForecastResponse =
      await response.json();
    const fiveDayForecast = convertToFiveDayForecast(fiveDayForecastResponse);
    return fiveDayForecast;
  } else {
    throw Error("Response was not ok");
  }
};
