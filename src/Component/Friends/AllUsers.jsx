import {
  Avatar,
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../Helper/axiosInstance";
import Footer from "../Footer/Footer";
import { RiMessage2Fill } from "react-icons/ri";
import { RiDeleteBin6Fill } from "react-icons/ri";

import "./style.css";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import toast,{Toaster} from "react-hot-toast";

const AllUsers = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token");
  let [data, setData] = useState([]);
  const [reload,setReload] = useState("")
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const myFriends = async () => {
      const { data } = await axiosInstance.get("/friends/myfriends", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.data.friends != null) {
        setData(data.data.friends.friends);
        setLoading(false)
      }
    };
    myFriends();
  }, [reload]);

  const createChat = async (id) => {
    let chatId;
    const createdChat = await axiosInstance.post(`/mainChat/${id}`,null,{headers:{Authorization:`Bearer ${token}`}})
    if(createdChat){
      chatId = createdChat.data.data.chatAvailable[0]._id
      navigate(`/home/chat/${chatId}`)

    }
  };

  const handleDelete = async (id) => {
    try{
      const deleted = await axiosInstance.delete(`/friends/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if(deleted){
        toast.remove("Friend Deleted..")
        setReload(reload+"a")
      }
    }
    catch(error){
      toast.error(error.message)
    }
  };

  return (
    <SimpleGrid w="100%" gap="10px" py="10px" justifyItems={"center"}>
      {loading?<HashLoader color="#cf00cf" />:<GridItem>
        {data ? (
          data.map((val, key) => {
            return (
              <Flex
                w={{ base: "90vw", md: "70vw", xl: "60vw" }}
                h="50px"
                border="2px solid purple"
                alignItems={"center"}
                my="10px"
                borderRadius={"8px"}
                key={key}
              >
                <Avatar name={val.name} src={`http://localhost:5000/${val.avatar[0].path}`} mx="10px" size={"sm"} bg="purple.500"></Avatar>
                <Text fontSize={{ base: "16px", md: "18px", xl: "24px" }} color="white">
                  {val.name}
                </Text>
                <Spacer></Spacer>
                <Button
                  id="msgBtn"
                  colorScheme="black"
                  size={{ base: "sm", md: "md", xl: "md" }}
                  mx="10px"
                  onClick={() => {
                    createChat(val._id);
                  }}
                >
                  <RiMessage2Fill id="msg" size={22} />
                </Button>
                <Button
                  id="delBtn"
                  colorScheme="black"
                  size={{ base: "sm", md: "md", xl: "md" }}
                  mx="10px"
                  onClick={() => {
                    handleDelete(val._id);
                  }}
                >
                  <RiDeleteBin6Fill id="msg" size={22} />
                </Button>
              </Flex>
            );
          })
        ) : (
          <Text>Empty</Text>
        )}
      </GridItem>}
    </SimpleGrid>
  );
};

export default AllUsers;
