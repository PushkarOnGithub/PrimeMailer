import { useEffect, useState } from "react";

const useFetchData = (url, options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(options)
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let res = await fetch(url, options);
        if (!res.ok) {
          throw new Error("Unable to Fetch Data");
        }
        res = await res.json();
        setData(res);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
