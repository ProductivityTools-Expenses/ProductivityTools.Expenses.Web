import { useEffect, useState } from "react";
import * as api from "../../Services/apiService";
import Bag from "../../Objects/Bag";
import Category from "../../Objects/Category";
import { Link, useNavigate, useParams } from "react-router-dom";

export function BagEdit() {
  let navigate = useNavigate();
  let { bagId } = useParams();

  const [bag, setBag] = useState<Bag>({
    bagId: null,
    name: "",
    description: "",
  });

  const [categories, setCategories] = useState<Category[]>()
  const [allCategories, setAllCategories] = useState<Category[]>()

  const [selectedNewCategoryId, setSelectedNewCategoryId] = useState<string>()

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.bagGet(Number(bagId));
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
        const data = await api.getCategoriesAll()
        setAllCategories(data);
      
    }

    fetchData()

  }, [])

  const add = async () => {
    var r = await api.bagSave(bag);
    navigate("/BagsTable");
  };

  //   const updateStringValue = (e: any) => {
  //     setCategory({ ...category, [e.target.name]: e.target.value } as Category);
  //   };

  return (
    <div>
      BagEdit page
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
          {categories?.map(x => <div>{x.name}</div>)}
        </div>
      </p>
      <button onClick={add}>addBag</button>
      <Link to="/BagsTable">Cancel</Link>

      <select
        name="categories"
        value={selectedNewCategoryId}
        onChange={(e) => {
          setSelectedNewCategoryId(e.target.value);
          console.log("fdsaf");
        }}
      >
        {allCategories?.map((x: Category) => (
          <option key={x.categoryId} value={x.categoryId || -1}>
            {x.name}
          </option>
        ))}
      </select>
    </div>
  );
}
