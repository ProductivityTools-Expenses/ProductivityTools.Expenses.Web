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
        <div>
          {categories?.map(x => <div>{x.name}</div>)}
        </div>
      </p>
      <button onClick={add}>add</button>
      <Link to="/BagsTable">Cancel</Link>
    </div>
  );
}
