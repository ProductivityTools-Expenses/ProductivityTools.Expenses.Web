import { useEffect, useState } from "react";
import * as api from "../../Services/apiService";
import Bag from "../../Objects/Bag";
import Category from "../../Objects/Category";
import BagCategoryEdit from "../../Objects/BagCategoryEdit"
import { Link, useNavigate, useParams } from "react-router-dom";
import { debug } from "console";

export function BagEdit() {
  let navigate = useNavigate();
  let { bagId } = useParams();

  const [bag, setBag] = useState<Bag>({
    bagId: null,
    name: "",
    description: "",
    categories: null
  });

  const [categories, setCategories] = useState<BagCategoryEdit[]>()
  const [notAssignedCategories, setNotAssignedCategories] = useState<Category[]>()
  const [selectedNewCategoryId, setSelectedNewCategoryId] = useState<string>()
  const [bagCategoryIdsToRemove, setbagCategoryIdsToRemove] = useState<number[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.bagGet(Number(bagId));
      console.log("GetBag", data)
      setBag(data);
    };
    if (bagId != null) {
      fetchData();
    }
  }, [bagId]);

  useEffect(() => {
    const fetchData = async () => {
      if (bag && bag.bagId) {
        const data = await api.getCategories(bag.bagId)
        setCategories(data);
      }
    }

    fetchData()

  }, [bag.bagId])

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getCategories(null)
      setNotAssignedCategories(data);

    }

    fetchData()

  }, [])

  const save = async () => {
    var r = await api.bagSave(bag, categories);
    var r = await api.removeCategoryFromBagCategory(bagCategoryIdsToRemove);
    navigate("/BagsTable");
  };

  //   const updateStringValue = (e: any) => {
  //     setCategory({ ...category, [e.target.name]: e.target.value } as Category);
  //   };

  const addCategoryToBag = async () => {
    let selectedCategory = notAssignedCategories?.find(x => x.categoryId == Number(selectedNewCategoryId));
    if (categories && selectedCategory) {
      setCategories([...categories, { categoryId: selectedCategory.categoryId, name: selectedCategory.name, bagCategoryId: null }])
    }
    console.log("categories", categories);
  }

  const removeCategoryFromTheBag = async (category: BagCategoryEdit) => {
    if (category.bagCategoryId) {
      setbagCategoryIdsToRemove([...bagCategoryIdsToRemove, category.bagCategoryId])
    }
    setCategories(x => x?.filter(item => item.categoryId !== category.categoryId && item.name !== category.name))
  }

  const editCategory = (categoryId: number | null) => {
    console.log(categoryId);
    navigate("/CategoryEdit/" + categoryId + "/BagEdit/" + bagId);
  };

  return (
    <div>
      BagEdit page
      <Link to="/Home">Home</Link>
      <p>
        Bag: id: {bag.bagId} name:{bag.name}, description:{bag.description}
      </p>
      <p>
        Value
        <input
          name="name"
          type="text"
          value={bag.name || ""}
          onChange={(e) => {
            setBag({ ...bag, name: e.target.value });
          }}
        ></input>
        <div>categories assigned ot this bag:
          {categories?.map(category => (
            <div>{category.name}
              <button onClick={(x => removeCategoryFromTheBag(category))}>Remove</button>
              <button onClick={(x => editCategory(category.categoryId))}>Edit</button>
            </div>
          ))}

        </div>
      </p>
      <button onClick={save}>Save</button>
      <Link to="/BagsTable">Cancel</Link>
      <br></br>
      <select
        name="categories"
        value={selectedNewCategoryId}
        onChange={(e) => {
          setSelectedNewCategoryId(e.target.value);
          console.log("fdsaf");
        }}
      >
        {notAssignedCategories?.map((x: Category) => (
          <option key={x.categoryId} value={x.categoryId || -1}>
            {x.name}
          </option>
        ))}
      </select>
      <br></br>
      <button onClick={addCategoryToBag}>add category to the bag</button>
    </div>
  );
}
