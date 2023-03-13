import { useState, useEffect } from "react";

const useAsyncFn = (asyncFn, dependencies) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (!Array.isArray(dependencies)) dependencies = [];

  useEffect(() => {
    setLoading(true);

    asyncFn()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });

    }, [...dependencies]); //eslint-disable-line
  return {
    data,
    loading,
    error,
  };
};

export default useAsyncFn;
