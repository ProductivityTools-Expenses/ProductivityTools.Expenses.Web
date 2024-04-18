import { useEffect, useState } from "react";
import * as api from "../../Services/apiService";
import Category from "../../Objects/Category";
import { useNavigate, useParams } from "react-router-dom";

export function CategoryEdit() {

  let { categoryId, backUrl, urlParam } = useParams();
  const navigate = useNavigate();
  console.log("categoryId param:", categoryId, "backUrl", backUrl);
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

  const save = async () => {
    var r = await api.saveCategory(category);
    if (backUrl != null) {
      console.log("BackUrl:", backUrl);
      navigate("/" + backUrl + "/" + urlParam)
    }
    else {
      navigate("/CategoriesTable")
    }
  };

  const updateStringValue = (e: any) => {
    setCategory({ ...category, [e.target.name]: e.target.value } as Category);
  };

  return (
    <div>
      <a href="\Home">home</a>
      <a href="\CategoriesTable">Category Table</a>
      <p>
        Value<input name="name" type="text" onChange={updateStringValue} value={category.name || ""}></input>
      </p>
      <button onClick={save}>Save</button>
    </div>
  );
}
