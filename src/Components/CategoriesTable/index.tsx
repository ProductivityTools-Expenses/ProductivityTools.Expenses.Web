import { useEffect, useState } from "react";
import * as api from "../../Services/apiService";
import Category from "../../Objects/Category";
import { useNavigate } from "react-router-dom";


export function CategoriesTable() {

  const [categories, setCategories] = useState<Category[]>();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getCategoriesAll();
      setCategories(data);
    }
    fetchData();
  }, [])


  const editCategory = (categoryId: number | null) => {
    console.log(categoryId);
    navigate("/CategoryEdit/" + categoryId);
  };

  return (
    <div>
      <p>Categories table</p>
      {categories?.map(x => {
        return (
          <div>
            {x.categoryId} {x.name} <button onClick={() => editCategory(x.categoryId)}>Edit</button>
          </div>
        )
      })}
    </div>
  );
}
