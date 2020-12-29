const xRapidapiKey =  '9a399a0436msh3ddca23ac3ffc46p1dcdd2jsn9be302f78071';


export const CONSTANTS = {
  COVID_API: "https://covid-19-data.p.rapidapi.com/totals",
  COUNTRY_POP_API: "https://world-population.p.rapidapi.com/population?country_name=",
  ALL_COUNTRIES_NAMES:
    "https://world-population.p.rapidapi.com/allcountriesname",
  WOLRD_POP_API: "https://world-population.p.rapidapi.com/worldpopulation",

  COVID_HEADERS: {
    "x-rapidapi-key": xRapidapiKey,
    "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
  },

  WORLD_POP_HEADERS: {
    "x-rapidapi-key": xRapidapiKey,
    "x-rapidapi-host": "world-population.p.rapidapi.com",
  },
};
