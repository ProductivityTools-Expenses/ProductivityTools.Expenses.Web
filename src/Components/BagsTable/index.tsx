import { useEffect, useState } from "react";
import * as api from "../../Services/apiService";
import Category from "../../Objects/Category";
import { Link } from "react-router-dom";


export function BagsTable() {
  return (
    <div>
      <Link to="/Home">Home</Link>
      <p>BagsTable</p>
    </div>
  );
}
