import { useEffect, useState } from "react";
import * as api from "../../Services/apiService";
import Category from "../../Objects/Category";
import { Link, useNavigate } from "react-router-dom";
import Bag from "../../Objects/Bag";

export function BagsTable() {
  const [bags, setBags] = useState<Bag[]>();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.bagsGet();
      setBags(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Link to="/Home">Home</Link>
      <p>BagsTable</p>
      {bags?.map((x) => {
        return (
          <div>
            {x.bagId} {x.name} <button onClick={() => navigate("/BagEdit/" + x.bagId)}>Edit</button>
          </div>
        );
      })}
    </div>
  );
}
