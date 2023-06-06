// External Dependencies
import axios from 'axios';

// Relative Dependencies
import { TruckData } from '../types';

const FOOD_TRUCK_API_URL = 'http://localhost:3001/food-trucks';

const fetchTruckData = async (): Promise<Array<TruckData | null>> => {
  const response = await axios.get(FOOD_TRUCK_API_URL);
  const { data } = response;

  return data;
};

export default fetchTruckData;
