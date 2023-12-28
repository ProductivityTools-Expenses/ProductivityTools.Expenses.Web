import Bag from "./Bag";
import Category from "./Category";

export default interface Expense {
  expenseId: number | null;
  name: string | null;
  date: string | null;
  amount: number | null;
  price: number | null;
  priceString: string | null;
  value: number | null;
  deductions: number | null;
  deductionsString: string | null;
  additions: number | null;
  additionsString: string | null;
  cost: number | null;
  comment: string | null;

  bagId: number | null;
  bag: Bag | null;
  categoryId: number | null;
  category: Category | null;
}
