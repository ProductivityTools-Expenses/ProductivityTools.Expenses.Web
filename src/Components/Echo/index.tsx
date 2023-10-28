import { useEffect, useState } from "react";
import * as api from "../../Services/apiService";

export function Echo() {
  const [echoData, setEchoData] = useState<string>("Nothing received yet");

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.echo();
      setEchoData(data);
    };
    fetchData();
  }, []);

  return <div>{echoData}</div>;
}
