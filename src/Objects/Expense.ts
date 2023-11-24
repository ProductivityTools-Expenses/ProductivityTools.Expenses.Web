import Bag from "./Bag";

export default interface Expense {
  expenseId: number;
  name: string | null;
  bag: Bag | null;
}
