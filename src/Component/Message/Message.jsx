import { Box, Button, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../Helper/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { HashLoader } from "react-spinners";

const Message = () => {
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchChats = async () => {
      const { data } = await axiosInstance.get("/mainChat", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChats(data.data.allChats);
      setLoading(false);
    };
    fetchChats();
  }, []);

  return (
    <Flex w="100%" flexDir={"column"} gap="15px" alignItems={"center"}>
      <Heading
        w="95%"
        bgGradient="linear(to-l,#7928CA,#FF0080)"
        bgClip={"text"}
        alignItems={"center"}
      >
        My Chats
      </Heading>

      {loading && chats[0]? (
        <HashLoader color="#cf00cf" />
      ) : (
        <Flex
          alignItems={"center"}
          flexDir={"column"}
          w="95%"
          h="auto"
          py="10px"
          gap="10px"
        >
          {chats.map((val, key) => {
            return (
              <Flex
                key={key}
                w="95%"
                border="2px solid purple"
                height={"55px"}
                px="10px"
                borderRadius={"10px"}
              >
                <Box>
                  <Text fontWeight={"bold"} color="purple">
                    {val.users[0]._id === id
                      ? val.users[1].name
                      : val.users[0].name}
                  </Text>
                  <Text pl="10px" color="white">
                    {val.latestMessage ? val.latestMessage.content:""}
                  </Text>
                </Box>
                <Spacer></Spacer>
                <Box py="auto" display={"flex"} alignItems={"center"}>
                  <Link to={`/home/chat/${val._id}`}>
                    <Button colorScheme="purple">Open</Button>
                  </Link>
                </Box>
              </Flex>
            );
          })}
        </Flex>
      )}
      <Toaster />
    </Flex>
  );
};

export default Message;
