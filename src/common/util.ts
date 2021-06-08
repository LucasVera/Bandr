import axios from "axios";

export const getSkip = (page: number, limit: number): number => (page - 1) * limit;

const {
  RANDOM_API_URL: randomApiUrl,
  RANDOM_API_AUTH_KEY: randomApiKey
} = process.env;
export const getRandomNumberFromApi = () => {
  return axios.post(`${randomApiUrl}/int`, {}, {
    headers: {
      auth: randomApiKey
    }
  });
};
