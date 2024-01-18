
import Category from "./Category";

export default interface Bag {
  bagId: number | null;
  name: string | null;
  description: string | null;
  categories: Category[] | null;
}
