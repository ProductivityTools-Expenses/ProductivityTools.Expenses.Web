import axios from "axios";
import { config } from "../Config";

async function echo() {
  const response = await axios.get(`${config.pathBase}/Expense/echo?name=pawel`);
  return response.data;
}

export { echo };
