import { useEffect, useState } from "react";
import * as api from "../../Services/apiService";
import Bag from "../../Objects/Bag";
import Category from "../../Objects/Category";

export function ExpenseEdit() {
  const [bags, setBags] = useState<Bag[]>();
  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    const getBags = async () => {
      const data = await api.getBags();
      setBags(data);
    };

    const getCategories = async () => {
      const data = await api.getCategories();
      setCategories(data);
    };

    getBags();
    getCategories();
  }, []);

  return (
    <div>
      <p>
        Name<input type="text"></input>{" "}
      </p>
      <p>
        Bag
        <select>
          {bags?.map((oneBag) => {
            return <option>{oneBag.name}</option>;
          })}
        </select>
      </p>
      <p>
        Category
        <select>
          {categories?.map((category) => {
            return <option>{category.name}</option>;
          })}
        </select>
      </p>
      <p>
        Date<input type="text"></input>
      </p>
      <p>
        Currency<select></select>
      </p>
      <p>
        Value<input type="text"></input>
      </p>
      <p>
        Discount<input type="text"></input>
      </p>
      <p>
        Free<input type="text"></input>
      </p>
      <p>
        Comment<input type="text"></input>
      </p>
    </div>
  );
}
