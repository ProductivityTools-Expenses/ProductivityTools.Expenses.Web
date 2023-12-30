import { useEffect, useState } from "react";
import * as api from "../../Services/apiService";
import Bag from "../../Objects/Bag";

export function BagEdit() {
  const [bag, setBag] = useState<Bag>({
    bagId: null,
    name: "",
    description: "",
  });

  //   const add = async () => {
  //     var r = await api.saveCategory(category);
  //   };

  //   const updateStringValue = (e: any) => {
  //     setCategory({ ...category, [e.target.name]: e.target.value } as Category);
  //   };

  return (
    <div>
        BagEdit page
      <p>
        Value<input name="name" type="text" onChange={() => {}}></input>
      </p>
      <button onClick={() => {}}>add</button>
    </div>
  );
}
