import React, { useEffect, useState } from "react";
import axios from "axios";
const useAxios = (url) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  if (!url) {
    setLoading(false);
    setData(null);
    setError(false);
    return;
  }
  useEffect(() => {
    setLoading(true);
    setError(false);
    axios(url)
      .then((response) => setData(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [url]);
  return { loading, data, error };
};

export default useAxios;
