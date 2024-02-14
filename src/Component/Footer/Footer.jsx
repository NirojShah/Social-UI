import { Flex } from "@chakra-ui/react";
import React from "react";
import { IoIosCreate } from "react-icons/io";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div style={{ width: "100%", height: "50px", margin: "0px" }}>
      <Flex
        pos="fixed"
        bottom={"10px"}
        right={"10px"}
        style={{ background: "rgb(6, 7, 3)" }}
        h="50px"
        w="50px"
        border="1px solid purple"
        borderTop={"3px solid purple"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        borderTopRadius={"5px"}
      >
        <Link to="/home/feeds/write">
          <IoIosCreate size={"30"} color="purple" />
        </Link>
      </Flex>
    </div>
  );
};

export default Footer;
