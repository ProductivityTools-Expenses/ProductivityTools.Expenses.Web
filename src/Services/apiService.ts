import axios from "axios";
import { config } from "../Config";
import { auth } from "../Session/firebase";
import Expense from "../Objects/Expense";
import Category from "../Objects/Category";

async function echo() {
  const response = await axios.get(`${config.pathBase}/Expense/echo?name=pawel`);
  return response.data;
}

async function getExpenses(bagId: number | null, categoryId: number | null) {
  console.log("apiservice,auth", auth);
  console.log("apiservice,current user", auth.currentUser);
  //  let idToken = await auth.currentUser?.getIdToken();
  let idToken = await auth.currentUser?.getIdToken();
  if (idToken == null) {
    console.log("id token from auth empty, trying to get from localstorage");
    idToken = String(localStorage.getItem("token"));
  }
  //let
  console.log("idToken:", idToken);

  console.log("apiservice, idToken:", idToken);
  if (idToken) {
    const header = {
      headers: { Authorization: `Bearer ${idToken}` },
    };

    var data = { BagId: bagId, CategoryId: categoryId };
    const response = await axios.post(`${config.pathBase}/Expense/List`, data, header);
    return response.data;
  } else {
    console.log("idtoken empty");
  }
}

async function deleteExpense(expenseId: number) {
  const response = await axios.post(`${config.pathBase}/Expense/Delete?expenseId=${expenseId}`);
  return response.data;
}

async function getBags() {
  const response = await axios.get(`${config.pathBase}/Expense/BagList`);
  return response.data;
}

async function getCategories(selectedBag: number) {
  var data = { bagId: selectedBag };
  const response = await axios.post(`${config.pathBase}/Category/CagetoryList`, data);
  return response.data;
}

async function saveCategory(category: Category) {
  const response = await axios.post(`${config.pathBase}/Category/CategorySave`, category);
  return response.data;
}

async function saveExpense(expense: Expense) {
  const response = await axios.post(`${config.pathBase}/Expense/Save`, expense);
  return response.data;
}

export { echo, getExpenses, deleteExpense, getBags, getCategories, saveCategory, saveExpense };
