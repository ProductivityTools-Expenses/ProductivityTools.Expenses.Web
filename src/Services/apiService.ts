import axios from "axios";
import { config } from "../Config";
import { auth } from "../Session/firebase";
import Expense from "../Objects/Expense";
import Category from "../Objects/Category";
import Bag from "../Objects/Bag";

async function echo() {
  const response = await axios.get(`${config.pathBase}/Expense/echo?name=pawel`);
  return response.data;
}

async function getExpenses(bagId: number | null, categoryId: string | null) {
 // console.log("apiservice,auth", auth);
 // console.log("apiservice,current user", auth.currentUser);
  //  let idToken = await auth.currentUser?.getIdToken();
  let idToken = await auth.currentUser?.getIdToken();
  if (idToken == null) {
    //console.log("id token from auth empty, trying to get from localstorage");
    idToken = String(localStorage.getItem("token"));
  }
  //let
  //console.log("idToken:", idToken);

  //console.log("apiservice, idToken:", idToken);
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

async function getExpense(expenseId: number) {
  let idToken = await auth.currentUser?.getIdToken();
  if (idToken == null) {
    console.log("id token from auth empty, trying to get from localstorage");
    idToken = String(localStorage.getItem("token"));
  }
  //let
  if (idToken) {
    const header = {
      headers: { Authorization: `Bearer ${idToken}` },
    };

    var data = { expenseId: expenseId };
    const response = await axios.post(`${config.pathBase}/Expense/Get`, data, header);
    let ex: Expense = response.data
    ex.priceString = ex.price?.toString() || "0";
    ex.deductionsString = ex.deductions?.toString() || "0";
    ex.additionsString = ex.additions?.toString() || "0";
    return response.data;
  } else {
    console.log("idtoken empty");
  }
}

async function deleteExpense(expenseId: number) {
  const response = await axios.post(`${config.pathBase}/Expense/Delete?expenseId=${expenseId}`);
  return response.data;
}

async function bagsGet() {
  const response = await axios.get(`${config.pathBase}/Bag/BagList`);
  return response.data;
}

async function bagGet(bagId: Number) {
  const response = await axios.get(`${config.pathBase}/Bag/Get?bagId=${bagId}`);
  return response.data;
}

async function bagSave(bag: Bag, categories: Category[] | undefined) {
  const data = { bag: bag, categories: categories }
  const response = await axios.post(`${config.pathBase}/Bag/Save`, data);
  return response.data;
}

async function removeCategoryFromBagCategory(bagCategoryIds: number[]) {
  const response = await axios.post(`${config.pathBase}/Bag/RemoveCategoryFromBagCategory`, bagCategoryIds)
  return response.data;
}


async function getCategories(selectedBag: number) {
  var data = { bagId: selectedBag };
  const response = await axios.post(`${config.pathBase}/Category/CagetoryList`, data);
  return response.data;
}

async function getCategoriesAll() {
  const response = await axios.get(`${config.pathBase}/Category/CategoryListAll`);
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


export {
  echo,
  getExpenses,
  getExpense,
  deleteExpense,
  bagsGet,
  bagGet,
  bagSave,
  removeCategoryFromBagCategory,
  getCategories,
  getCategoriesAll,
  saveCategory,
  saveExpense,
};
