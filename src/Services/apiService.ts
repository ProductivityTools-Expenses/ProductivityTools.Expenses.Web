import axios from "axios";
import { config } from "../Config";

async function echo() {
  const response = await axios.get(`${config.pathBase}/Expense/echo?name=pawel`);
  return response.data;
}

async function getExpenses() {
  const response = await axios.get(`${config.pathBase}/Expense/List`);
  return response.data;
}

export { echo, getExpenses };
