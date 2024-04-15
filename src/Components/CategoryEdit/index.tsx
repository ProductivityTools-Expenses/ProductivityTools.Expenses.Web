import { useEffect, useState } from "react";
import * as api from "../../Services/apiService";
import Category from "../../Objects/Category";
import { useNavigate, useParams } from "react-router-dom";

export function CategoryEdit() {

  let { categoryId } = useParams();
  console.log("categoryId param:", categoryId);
  const [category, setCategory] = useState<Category>({
    categoryId: null,
    name: "",
  });

  useEffect(() => {
    const getCategory = async () => {
      console.log("invoke getCategory");
      let data = await api.getCategory(Number(categoryId));
      setCategory(data);
    }

    if (categoryId != undefined) {
      getCategory();
    }
  }, [categoryId])

  const add = async () => {
    var r = await api.saveCategory(category);
  };

  const updateStringValue = (e: any) => {
    setCategory({ ...category, [e.target.name]: e.target.value } as Category);
  };

  return (
    <div>
      <a href="\home">home</a>
      <p>
        Value<input name="name" type="text" onChange={updateStringValue}></input>
      </p>
      <button onClick={add}>add</button>
    </div>
  );
}
