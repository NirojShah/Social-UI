import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spacer,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../Helper/axiosInstance";

const Updateprofile = () => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  let [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const fetchData = async (id) => {
    const { data } = await axiosInstance.get(`/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUserData(data.data.user);
  };

  useEffect(() => {
    fetchData(id);
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({...userData,[name]:value})
  };

  const handleUpdate = async () => {
    let payload = {
      name : userData.name,
      email : userData.email,
      phone : userData.phone,
    }
    const {data} = await axiosInstance.put(`/user/update`,payload,{headers:{Authorization:`Bearer ${token}`}})
    console.log(data)
  };

  return (
    <>
      <Flex
        position={"absolute"}
        top={"140px"}
        w="100%"
        height={"400px"}
        bg={"black"}
        m={"0px auto"}
        justify={"center"}
      >
        <Flex
          border={"1px solid purple"}
          borderTop={"5px solid purple"}
          w={{ base: "90%", md: "450px", xl: "400px" }}
          h={{ base: "350px", md: "350px", xl: "350px" }}
          borderRadius={"5px"}
        >
          <FormControl
            display={"flex"}
            flexDir={"column"}
            justifyContent={"space-evenly"}
            px={"20px"}
          >
            <Box>
              <FormLabel name="name" color={"white"}>
                Name
              </FormLabel>
              <Input
                color={"purple.500"}
                name="name"
                type="text"
                defaultValue={userData.name}
                onChange={handleChange}
              />
              <FormLabel name="email" color={"white"}>
                Email
              </FormLabel>
              <Input
                color={"purple.500"}
                name="email"
                type="email"
                defaultValue={userData.email}
                onChange={handleChange}
              />
              <FormLabel name="phone" color={"white"}>
                Phone
              </FormLabel>
              <Input
                color={"purple.500"}
                name="phone"
                type="text"
                defaultValue={userData.phone}
                onChange={handleChange}
              />
            </Box>
            <Box display={"flex"} gap={"10px"}>
              <Button onClick={handleUpdate} size={"sm"} colorScheme="purple">
                UPDATE
              </Button>
              <Link to={"/profile"}>
                <Button size={"sm"} colorScheme="purple">
                  CLOSE
                </Button>
              </Link>
            </Box>
          </FormControl>
        </Flex>
      </Flex>
    </>
  );
};

export default Updateprofile;
