import React, { useState, useEffect, useContext, Dispatch } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export default function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
