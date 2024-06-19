import { useEffect, useState } from "react";
import * as api from "../../Services/apiService";
import Category from "../../Objects/Category";
import { useNavigate, useParams } from "react-router-dom";
import TagGroup from "../../Objects/TagGroup";
import Tag from "../../Objects/Tag";

export function CategoryEdit() {

  let { categoryId, backUrl, urlParam } = useParams();
  const navigate = useNavigate();
  console.log("categoryId param:", categoryId, "backUrl", backUrl);
  const [category, setCategory] = useState<Category>({
    categoryId: null,
    name: "",
  });
  const [tagGroup, setTagGroup] = useState<TagGroup[]>();
  const [allTagGroups, setAllTagGroups] = useState<TagGroup[]>();
  const [selectedTagId, setSelectedTagId] = useState<string>("");

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
      console.log("getTagGroups, categoryId:", categoryId);
      if (category.categoryId) {
        let data = await api.getTagGroupForCategory(category.categoryId);
        setTagGroup(data);
        console.log("tagGroups", data);
      }
    }
    getTagGroups();
  }, [category.categoryId])

  useEffect(() => {
    const getAllTagGroups = async () => {
      console.log("getAllTagGroups");
      let data = await api.getAllTagGroups();
      setAllTagGroups(data);
      console.log("tagGroups", data);
    }
    getAllTagGroups();
  }, [])


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

  const addTagGroupToCategory = (tagGroupId: number, categoryId: number) => {
    api.addTagGroupToCategory(tagGroupId, categoryId);
  }

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
      <select
        name="tags"
        value={selectedTagId}
        onChange={(e) => {
          setSelectedTagId(e.target.value);
          console.log("setSelectedTagId",e.target.value);
        }}
      >
        {allTagGroups?.map((x: TagGroup) => (
          <option key={x.tagGroupId} value={x.tagGroupId || -1}>
            {x.name}
          </option>
        ))}
      </select>
      <button onClick={() => addTagGroupToCategory(Number(selectedTagId), Number(categoryId))}>AddTag</button>
      <hr />
      <button onClick={save}>Save</button>
    </div>
  );
}
