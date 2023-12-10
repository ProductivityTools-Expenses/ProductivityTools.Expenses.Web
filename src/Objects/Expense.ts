import Bag from "./Bag";
import Category from "./Category";

export default interface Expense {
  expenseId: number | null;
  name: string | null;
  date: Date | null;

  bagId: number | null;
  bag: Bag | null;
  categoryId: number | null;
  category: Category | null;
  value: number | null;
  // expectedValue: number | null;
  free: boolean;
  comment: string | null;
  discount: number;
  // valueAfterDiscount: number | null;
}
