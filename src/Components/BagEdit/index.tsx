import { useEffect, useState } from "react";
import * as api from "../../Services/apiService";
import Bag from "../../Objects/Bag";
import { Link, useNavigate, useParams } from "react-router-dom";

export function BagEdit() {
  let navigate = useNavigate();
  let { bagId } = useParams();

  const [bag, setBag] = useState<Bag>({
    bagId: null,
    name: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.bagGet(Number(bagId));
      setBag(data);
    };
    if (bagId != null) {
      fetchData();
    }
  }, [bagId]);

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
      </p>
      <button onClick={add}>add</button>
      <Link to="/BagsTable">Cancel</Link>
    </div>
  );
}
