import Bag from "./Bag";
import Category from "./Category";

export default interface Expense {
  expenseId: number;
  name: string | null;
  date: Date | null;

  bag: Bag | null;
  category: Category | null;
  value: number | null;
  expectedValue: number | null;
  free: boolean | null;
  comment: string | null;
  discount: number | null;
  valueAfterDiscount: number | null;
}
