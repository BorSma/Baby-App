/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from "react";
import { BabyAppContext } from "./BabyAppContext";

export const useRegistryItems = () => {
  const [registryItems, setRegistryItems] = useState({});
  const { fetch, _id, set_id } = useContext(BabyAppContext);

  useEffect(() => {
    if (_id && _id.action === "buy") {
      buyRegistryItem();
    } else if (_id && _id.action === "delete") {
      deleteRegistryItem();
    } else if (_id && _id.action === "unbuy") {
      unbuyRegistryItem();
    } else console.log("Id updated");
  }, [_id]);

  useEffect(() => {
    console.log("registryItems:", registryItems);
  }, [registryItems]);

  const fetchRegistryItems = async () => {
    const data = await fetch("/populateregistry", {
      method: "GET",
    });
    setRegistryItems(data);
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

  const buyRegistryItem = async () => {
    await fetch("/buyregistryitem", {
      method: "PUT",
    });
  };

  const unbuyRegistryItem = async () => {
    await fetch("/unbuyregistryitem", {
      method: "PUT",
    });
  };

  return {
    registryItems,
    fetchRegistryItems,
    addRegistryItem,
    deleteRegistryItem,
    buyRegistryItem,
    unbuyRegistryItem,
  };
};
