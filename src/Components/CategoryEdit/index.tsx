import { useEffect, useState } from "react";
import * as api from "../../Services/apiService";
import Category from "../../Objects/Category";
import { useNavigate, useParams } from "react-router-dom";
import TagGroup from "../../Objects/TagGroup";

export function CategoryEdit() {

  let { categoryId, backUrl, urlParam } = useParams();
  const navigate = useNavigate();
  console.log("categoryId param:", categoryId, "backUrl", backUrl);
  const [category, setCategory] = useState<Category>({
    categoryId: null,
    name: "",
  });
  const [tagGroup, setTagGroup] = useState<TagGroup[]>();

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


  useEffect(() => {
    const getTagGroups = async () => {
      console.log("getTagGroups");
      if (category.categoryId) {
        let data = await api.getTagGroupForCategory(category.categoryId);
        setTagGroup(data);
        console.log("tagGroups", data);
      }
    }
    getTagGroups();
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
      <p>
        TagGroups:
        {tagGroup?.map(x => {
          return <div>{x.name}</div>
        })}
      </p>
      <button onClick={save}>Save</button>
    </div>
  );
}
