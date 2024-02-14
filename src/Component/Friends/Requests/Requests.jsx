import React, { useEffect, useState } from "react";
import axiosInstance from "../../../Helper/axiosInstance";
import Nav from "../../Nav Bar/Nav";
import { Box, Button, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { TiTick } from "react-icons/ti";
import { GiSkullCrossedBones } from "react-icons/gi";

const Requests = () => {
  let token = localStorage.getItem("token");
  const [reload,setReload] = useState("")
  const [myReq, setMyReq] = useState([]);
  useEffect(() => {
    const fetchRequest = async () => {
      let { data } = await axiosInstance.get("/friends/myrequests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data.data.myReq);
      setMyReq(data.data.myReq.request);
    };
    fetchRequest();
  }, [reload]);

  const handleAccept = async (id) => {
    const acceptedReq = await axiosInstance.post(
      `/friends/accept/${id}`,
      null,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(acceptedReq)
    setReload(reload+"a")
  };

  return (
    <>
      <Nav />
      <Flex w="100%" h="450px" alignItems={"center"} flexDir={"column"}>
        <Heading w="90%" color="purple.300">
          My Requests
        </Heading>
        <Flex
          w="95%"
          h="450px"
          border={"2px solid purple"}
          flexDir={"column"}
          p="10px"
          gap="10px"
          overflowY={"scroll"}
        >
          {myReq.map((val, key) => {
            return (
              <Box
                key={key}
                w="90%"
                border="3px solid purple"
                borderRadius={"8px"}
                display={"flex"}
                alignItems={"center"}
                py="5px"
                px="8px"
              >
                <Text fontSize={"25px"} fontWeight={"bold"} color="white">
                  {val.name}
                </Text>
                <Spacer></Spacer>
                <Button
                  colorScheme="purple"
                  size="sm"
                  mx="15px"
                  title="accept"
                  onClick={() => {
                    handleAccept(val._id);
                  }}
                >
                  <TiTick size={"30"} color="white" />
                </Button>
                <Button colorScheme="purple" size="sm" mx="15px" title="reject">
                  <GiSkullCrossedBones size={"30"} color="white" />
                </Button>
              </Box>
            );
          })}
        </Flex>
      </Flex>
    </>
  );
};

export default Requests;
