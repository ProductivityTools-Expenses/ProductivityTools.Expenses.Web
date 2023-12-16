import { useEffect, useState } from "react";
import * as api from "../../Services/apiService";
import Category from "../../Objects/Category";

export function CategoryEdit() {
  const [category, setCategory] = useState<Category>({
    categoryId: null,
    name: "",
  });

  const add = async () => {
    var r = await api.saveCategory(category);
  };

  const updateStringValue = (e: any) => {
    setCategory({ ...category, [e.target.name]: e.target.value } as Category);
  };

  return (
    <div>
      <p>
        Value<input name="name" type="text" onChange={updateStringValue}></input>
      </p>
      <button onClick={add}>add</button>
    </div>
  );
}
