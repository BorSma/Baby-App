import React from "react";
import styled from "styled-components";
import amazon from "../../Assets/amazon.jpg";
import well from "../../Assets/well.jpg";
import ikea from "../../Assets/ikea.jpg"
import tradle from "../../Assets/tradle.jpg"
import {
  IoMdCart
} from "react-icons/io";


const Logo = ({ vendor }) => {
  if (vendor === "amazon")
    return (<Symbol alt={vendor} src={amazon} title="Amazon"></Symbol>)
  else if (vendor === "well")
    return (<Symbol alt={vendor} src={well} title="Well"></Symbol>)
  else if (vendor === "ikea")
    return (<Symbol alt={vendor} src={ikea} title="Ikea"></Symbol>)
    else if (vendor === "tradle")
    return (<Symbol alt={vendor} src={tradle} title="Tradle"></Symbol>)
  else return (<IoMdCart size="25" />)
};

const Symbol = styled.img`
  width: 40px;
  height: 40px;
  margin: 3px;
  border-style: none;
  border-radius: 100%;
`;

export default Logo;
