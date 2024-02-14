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
import { IoMdAddCircle } from "react-icons/io";
import { HashLoader } from "react-spinners";
import toast,{Toaster} from "react-hot-toast";

const Myfriends = () => {
  const token = localStorage.getItem("token");
  let [data, setData] = useState([]);
  let [reload, setReload] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let { data } = await axiosInstance.get("/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(data.data.allUsers);
      setLoading(false);
    };
    fetchData();
  }, [reload]);

  const addFriend = async (id) => {
    try{
      const addFriend = await axiosInstance.get(`/friends/sent/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Friend Request Sent..")
    }
    catch(error){
      toast.error(error.messsage)
    }
  };

  return (
    <SimpleGrid w="100%" gap="10px" py="10px" justifyItems={"center"}>
      {loading ? (
        <HashLoader color="#cf00cf" />
      ) : (
        <GridItem>
          {data.map((val, key) => {
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
                <Avatar
                  mx="10px"
                  src={`http://localhost:5000/${val.avatar[0].path}`}
                  size={"sm"}
                  name={val.name}
                  bg="purple.500"
                ></Avatar>
                <Text
                  fontSize={{ base: "16px", md: "18px", xl: "24px" }}
                  color={"white"}
                >
                  {val.name}
                </Text>
                <Spacer></Spacer>
                <Button
                  colorScheme="purple"
                  size={{ base: "sm", md: "md", xl: "md" }}
                  mx="10px"
                  title="add to friends"
                  onClick={() => {
                    addFriend(val._id);
                  }}
                >
                  <IoMdAddCircle size={22} color="black" />
                </Button>
              </Flex>
            );
          })}
        </GridItem>
      )}
      <Toaster/>
    </SimpleGrid>
  );
};

export default Myfriends;
