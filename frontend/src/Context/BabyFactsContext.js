import { useState, useContext, useEffect } from "react";
import { BabyAppContext } from "./BabyAppContext";

export const useBabyFacts = () => {
  const [babyFact, setBabyFact] = useState({});
  const [loading, setLoading] = useState(true);
  const { fetch, monthsLeft } = useContext(BabyAppContext);

  const fetchBabyFact = async () => {
    console.log("Fetching the babyfact!!");
    if (monthsLeft > 0) {
      setLoading(true);
      const data = await fetch("/populatebabyfact", {
        method: "GET",
      });
      if (data.status > 0) setBabyFact({ ...data });
    }
  };

  useEffect(() => {
    if (monthsLeft > 0 && !babyFact.status) {
      //console.log(babyFact);
      fetchBabyFact();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthsLeft]);

  useEffect(() => {
    if (loading && babyFact.data) {
      //console.log(babyFact);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [babyFact.data]);

  return {
    babyFact,
    loading,
    fetchBabyFact,
  };
};
