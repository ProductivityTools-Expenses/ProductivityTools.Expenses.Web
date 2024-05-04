import Tag from './Tag'

export default interface ExpenseTag {
  expenseTagId: number | null;
  expenseId: number;
  tagId: Tag;
}