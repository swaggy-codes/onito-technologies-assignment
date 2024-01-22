import { getApi } from "./AxiosCalls";

export const getCountriesList = (country_name) => {
  // console.log(country_name, "country query...");
  return getApi(`https://restcountries.com/v3.1/name/${country_name}`);
};
