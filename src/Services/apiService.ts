import axios from "axios";
import { config } from "../Config";

async function echo() {
  const response = await axios.get(`${config.pathBase}/Expense/echo?name=pawel`);
  return response.data;
}

async function getExpenses(bagId: number | null) {
  var data = { BagId: bagId };
  const response = await axios.post(`${config.pathBase}/Expense/List`, data);
  return response.data;
}

async function getBags() {
  const response = await axios.get(`${config.pathBase}/Expense/BagList`);
  return response.data;
}

async function getCategories() {
  const response = await axios.get(`${config.pathBase}/Expense/CagetoryList`);
  return response.data;
}

export { echo, getExpenses, getBags, getCategories };
