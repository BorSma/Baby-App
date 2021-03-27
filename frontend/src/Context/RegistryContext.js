import { useState, useContext, useEffect } from "react";
import { BabyAppContext } from "./BabyAppContext";

export const useRegistryItems = () => {
  const [registryItems, setRegistryItems] = useState([]);
  const { fetch } = useContext(BabyAppContext);

  const fetchRegistryItems = async () => {
    const data = await fetch("/populateregistry", {
      method: "GET",
    });
    setRegistryItems(data.registryItems);
  };

  const addRegistryItem = async () => {
    await fetch("/addregistryitem", {
      method: "POST",
    });
  };

  const deleteRegistryItem = async () => {
    await fetch("/deleteregistryitem", {
      method: "DELETE",
    });
  };

  useEffect(() => {
    console.log(registryItems);
  }, [registryItems]);

  return {
    registryItems,
    fetchRegistryItems,
    addRegistryItem,
    deleteRegistryItem,
  };
};
