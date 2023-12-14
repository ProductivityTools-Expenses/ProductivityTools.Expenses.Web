import Bag from "./Bag";
import Category from "./Category";

export default interface Expense {
  expenseId: number | null;
  name: string | null;
  date: Date | null;
  amount: number | null;
  price: number | null;
  value: number | null;
  deductions: number | null;
  additions: number | null;
  cost: number | null;
  comment: string | null;

  bagId: number | null;
  bag: Bag | null;
  categoryId: number | null;
  category: Category | null;
}
