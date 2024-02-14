import React, { useEffect, useState } from "react";
import Nav from "../Nav Bar/Nav";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Img,
  Text,
} from "@chakra-ui/react";
import axiosInstance from "../../Helper/axiosInstance";
import { HashLoader } from "react-spinners";
import { Link, Outlet, useNavigate } from "react-router-dom";


const Profile = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const [loading, setLoading] = useState(true);

  const fetchData = async (id) => {
    const { data } = await axiosInstance.get(`/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUserData(data.data.user);
    console.log(data.data.user);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(id);
  }, []);

  const handleUpdate = ()=>{
    navigate("/profile/edit")
  }

  return (
    <>
      <Nav />
      <Flex w="100%" h="400px" flexDir={"column"} pl={"20px"} gap="20px">
        <Heading
          w="90%"
          bgGradient="linear(to-l,#7928CA,#FF0080)"
          bgClip={"text"}
        >
          My Profile
        </Heading>
        {loading ? (
          <HashLoader color="#cf00cf" />
        ) : (
          <Card
            colorScheme="purple"
            width={"80%"}
            bg="black"
            border="1px solid purple"
            borderTop={"5px solid purple"}
          >
            <CardHeader
              bgGradient="linear(to-l,#7928CA,#FF0080)"
              bgClip={"text"}
              display={"flex"}
              alignItems={"center"}
              gap="10px"
            >
              <Avatar w="100px" h="100px" src={`http://localhost:5000/${userData.avatar[0].path}`} name={userData.name}/>
              <Heading>{userData.name}</Heading>
            </CardHeader>
            <CardBody>
              <Text color={"white"}>{userData.email}</Text>
              <Text color={"white"}>{userData.phone}</Text>
              <Text color={"white"}>
                <span style={{ color: "red" }}>25</span> Feeds
              </Text>
            </CardBody>
            <CardFooter>
                <Button onClick={handleUpdate} colorScheme="purple">EDIT</Button>
            </CardFooter>
          </Card>
        )}
      </Flex>
      <Outlet />
    </>
  );
};

export default Profile;
