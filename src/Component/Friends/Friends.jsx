import React from "react";
import AllUsers from "./AllUsers";
import { Flex, Heading } from "@chakra-ui/react";
import Myfriends from "./Myfriends";

const Friends = () => {
  return (
    <Flex flexDir={"column"} alignItems={"center"} w="100%" >
      <Heading w="75%" bgGradient="linear(to-l,#7928CA,#FF0080)"
            bgClip={"text"}
            alignItems={"center"}>My Friends</Heading>
      <AllUsers />
      <Heading w="75%" bgGradient="linear(to-l,#7928CA,#FF0080)"
            bgClip={"text"}
            alignItems={"center"}>All Users</Heading>
      <Myfriends />
    </Flex>
  );
};

export default Friends;
