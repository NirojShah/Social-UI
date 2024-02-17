import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../Helper/axiosInstance";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Text,
} from "@chakra-ui/react";

import io from "socket.io-client";
import { Link, useLocation, useParams } from "react-router-dom";
var socket = io("https://social-back-ffwk.onrender.com");

const Delete = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const { id } = useParams("id");
  const messagesEndRef = useRef(null);

  let [allMsg, setAllMsg] = useState([]);
  const [msg, setMsg] = useState("");

  // const fetchUser = async(id)=>{
  //   const user = await axiosInstance.get(`/user/${id}`,{headers:{Authorization:`Bearer ${token}`}})
  //   console.log(user)
  // }

  const scrollToBottom = () => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [allMsg]);

  const fetchChats = async (id) => {
    let allChat = await axiosInstance.get(`/message/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAllMsg(allChat.data.data.messages);
  };

  useState(() => {
    fetchChats(id);
    // fetchUser(id)
  }, []);

  // Socket Use Effects -
  useEffect(() => {
    socket.emit("joined chat", id);
    socket.on("recieved_message", (data) => {
      let messageR = {
        content: data.msg,
        sender: {
          _id: data.userId,
        },
      };
      if (allMsg) {
        setAllMsg((prevMessages) => [...prevMessages, messageR]);
      }
    });
  }, []);

  const handleSend = async () => {
    const payload = {
      message: msg,
    };
    let messageR = {
      content: msg,
      sender: {
        _id: userId,
      },
    };

    const sendMsg = await axiosInstance.post(`/message/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    socket.emit("send_message", {
      msg: sendMsg.data.data.newMessage.content,
      id,
      userId,
    });
    if (sendMsg) {
      setAllMsg((prevMessages) => [...prevMessages, messageR]);
      setMsg("");
    }
  };

  return (
    <Flex flexDir={"column"} alignItems={"center"} w="100%" pt="20px" gap="5px">
      <Box
        w="95%"
        h="60px"
        border={"1px solid purple"}
        display={"flex"}
        alignItems={"center"}
        px="7px"
      >
        <Link to="/home/chats">
          <Button colorScheme="purple" borderRadius={"100%"} w="45px" h="45px">
            <MdOutlineArrowBackIosNew color="white" size={25} />
          </Button>
        </Link>
        <Container>
          <Text
            textAlign={"center"}
            fontSize={"22px"}
            fontWeight={"bold"}
            color={"purple"}
          >
            Niraj
          </Text>
        </Container>
      </Box>
      <Flex
        border="2px solid purple"
        w="95%"
        h="350px"
        flexDir={"column"}
        overflowX={"scroll"}
        ref={messagesEndRef}
        px="8px"
      >
        {allMsg.map((val, key) => {
          return (
            <>
              {val.sender._id === userId ? (
                <Box
                  maxWidth="45%"
                  bg="purple.600"
                  alignSelf="flex-end"
                  borderRadius={"5px"}
                  my="5px"
                  px="8px"
                  py="5px"
                >
                  <Text key={key} color="white">
                    {val.content}
                  </Text>
                </Box>
              ) : (
                <Box
                  maxWidth="45%"
                  bg="purple"
                  alignSelf="flex-start"
                  borderRadius={"5px"}
                  my="5px"
                  px="8px"
                  py="5px"
                >
                  <Text key={key} color={"white"}>
                    {val.content}
                  </Text>
                </Box>
              )}
            </>
          );
        })}
      </Flex>
      <Box w="95%">
        <InputGroup w="100%">
          <Input
            value={msg}
            type="text"
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            color="purple.400"
            _focus={{ border: "2px solid purple" }}
          />
          <InputRightElement width="100px">
            <Button w="100px" colorScheme="purple" onClick={handleSend}>
              Send
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
    </Flex>
  );
};

export default Delete;
