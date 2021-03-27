import { useState, useContext} from "react";
import { BabyAppContext } from "./BabyAppContext";

export const useBabyFacts = () => {
  const [babyFact, setBabyFact] = useState({});
  const { fetch } = useContext(BabyAppContext);

  const fetchBabyFact = async () => {
    const data = await fetch("/populatebabyfact", {
      method: "GET",
    });
    setBabyFact({...data.data});
  };
  

  // useEffect(() => {
  //   console.log(`babyFact`,babyFact);
  // }, [babyFact]);

  return {
    babyFact,
    fetchBabyFact
  };
};
