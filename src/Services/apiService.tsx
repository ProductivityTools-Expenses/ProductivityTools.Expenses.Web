import axios from "axios";
import { config } from "../Config";
import { auth } from "../Session/firebase";
import Expense from "../Objects/Expense";
import Category from "../Objects/Category";
import Bag from "../Objects/Bag";
import { toast } from "react-toastify";


async function echo() {
  const response = await axios.get(`${config.pathBase}/Expense/echo?name=pawel`);
  return response.data;
}



async function invokeCallWithToast(call: any, pendingMessage: string, successMessage: string) {
  return toast.promise(invokeCall(call), {
    pending: pendingMessage ? pendingMessage : "Missing pending message",
    success: successMessage ? successMessage : "Missing sucesss message",
    error: {
      render(data: any) {
        console.log(data);
        return (
          <p>
            {data.message}[{data.response.data.message}]
          </p>
        );
      },
    },
  });
}

async function invokeCall(call: any) {
  let token = localStorage.getItem("token");
  //console.log("token from localstorage", token)
  const header = { headers: { Authorization: `Bearer ${token}` } };
  try {
    const response = call(header);
    return response;
  } catch (error) {
    console.log("Call endpoint");
    console.log(error);
  }
}

async function getExpenses(bagId: number | null, categoryId: string | null) {

  const call = async (header: any) => {
    var data = { BagId: bagId, CategoryId: categoryId };
    const response = await axios.post(`${config.pathBase}/Expense/List`, data, header);
    return response.data;
  }
  var r = invokeCallWithToast(call, "Invoke call for expenses", "Expenses returned");
  return r;
}

async function getExpenses2(bagId: number | null, categoryId: string | null) {
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


async function getCategories(selectedBag: number | null) {
  var data = { bagId: selectedBag };
  const response = await axios.post(`${config.pathBase}/Category/CagetoryList`, data);
  return response.data;
}

async function getCategory(categoryId: number) {
  var data = { categoryId: categoryId };
  const response = await axios.get(`${config.pathBase}/Category/Category?categoryId=${categoryId}`);
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

async function getTags(expenseIds: number[]) {
  const response = await axios.post(`${config.pathBase}/Tag/GetTags`, expenseIds);
  return response.data;
}

async function getTagsSummary(tagId: number) {
  const response = await axios.get(`${config.pathBase}/Tag/GetTagsSummary?tagId=${tagId}`);
  return response.data;
}

async function getTagGroup(tagId: number) {
  const response = await axios.get(`${config.pathBase}/Tag/GetTagGroup?tagId=${tagId}`);
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
  getCategory,
  getCategoriesAll,
  saveCategory,
  saveExpense,

  getTags,
  getTagsSummary,
  getTagGroup
};
