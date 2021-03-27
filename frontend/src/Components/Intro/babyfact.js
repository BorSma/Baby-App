import { useEffect } from "react";
import { useBabyFacts } from "../../Context/BabyFactsContext";

const BabyFact = () => {
  const { fetchBabyFact, babyFact } = useBabyFacts();

  useEffect(() => {
    if (!babyFact.Title) fetchBabyFact();
  }, []);

  if (!babyFact.Title) {
    return <p>loading</p>;
  } else {
    return (
      <>
        <div>
          <p>Trimester: {babyFact.Trimester}</p>
          <p>Month: {babyFact.Month}</p>
          <p>Title: {babyFact.Title}</p>
          <p>Description: {babyFact.Description}</p>
        </div>
      </>
    );
  }
};

export default BabyFact;
