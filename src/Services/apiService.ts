import axios from "axios";
import { config } from "../Config";
import { auth } from "../Session/firebase";

async function echo() {
  const response = await axios.get(`${config.pathBase}/Expense/echo?name=pawel`);
  return response.data;
}

async function getExpenses(bagId: number | null) {
  console.log("apiservice,auth", auth);
  console.log("apiservice,current user", auth.currentUser);
//  let idToken = await auth.currentUser?.getIdToken();
  let idToken=localStorage.getItem("token");
  console.log("idToken:",idToken);

  console.log("apiservice, idToken:", idToken);
  if (idToken) {
    const header = {
      headers: { Authorization: `Bearer ${idToken}` },
    };

    var data = { BagId: bagId };
    const response = await axios.post(`${config.pathBase}/Expense/List`, data, header);
    return response.data;
  }
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
