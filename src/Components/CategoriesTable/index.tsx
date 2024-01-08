import { useEffect, useState } from "react";
import * as api from "../../Services/apiService";
import Category from "../../Objects/Category";

export function CategoriesTable() {

  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getCategoriesAll();
      setCategories(data);
    }
    fetchData();
  }, [])

  return (
    <div>
      <p>Categories table</p>
      {categories?.map(x => {
        return (
          <div>
            {x.categoryId} {x.name}
          </div>
        )
      })}
    </div>
  );
}
