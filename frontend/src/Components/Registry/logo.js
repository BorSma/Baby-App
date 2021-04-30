import React from "react";
import styled from "styled-components";
import amazon from "../../Assets/amazon.jpg";
import well from "../../Assets/well.jpg";
import {
  IoMdCart
} from "react-icons/io";


const Logo = ({ vendor }) => {
  if (vendor === "amazon")
    return (<Symbol alt={vendor} src={amazon} title="Amazon.ca"></Symbol>)
  else if (vendor === "well")
    return (<Symbol alt={vendor} src={well} title="Well.ca"></Symbol>)
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
