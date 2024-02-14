import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Icon,
  List,
  ListItem,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../Helper/axiosInstance";

const Nav = () => {
  // const id = useSelector((state) => state.navFeature.value.id);
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("name");
  const [req, setReq] = useState(0);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const fetchUser = async () => {
    const { data } = await axiosInstance.get(`/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (data) {
      setUser({ ...data.data.user });
    }
  };

  const fetchReq = async () => {
    const { data } = await axiosInstance.get("/friends/myrequests", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (data.data.myReq) {
      setReq(data.data.myReq.request.length);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchReq();
  }, []);

  return (
    <div
      style={{
        height: "75px",
        width: "100%",
        marginBottom: "8px",
        background: "rgb(6, 7, 3)",
      }}
    >
      {user ? (
        <Flex
          h="75px"
          w="100%"
          px={{ base: "15px", md: "25px", xl: "30px" }}
          alignItems={"center"}
          flexDirection={{ base: "row", md: "row", xl: "row" }}
          borderBottom={{
            base: "none",
            md: "2px solid purple",
            xl: "2px solid purple",
          }}
          position={"fixed"}
          style={{ background: "rgb(6, 7, 3)" }}
          zIndex={2}
          borderBottomWidth={"2px"}
        >
          <Box alignItems={"center"}>
            <Link to="/home/chats">
              <Heading
                bgGradient="linear(to-l,#7928CA,#FF0080)"
                bgClip={"text"}
                alignItems={"center"}
              >
                Logo
              </Heading>
            </Link>
          </Box>
          <Spacer />
          <List
            display={{ base: "none", xl: "flex", md: "flex" }}
            gap="20px"
            alignItems={"center"}
          >
            <ListItem >
              <Text
                textColor={"purple.400"}
                fontSize={"20px"}
                fontWeight={"bold"}
                bgGradient="linear(to-l,#7928CA,#FF0080)"
                bgClip={"text"}
                display={"flex"} alignItems={"center"}
                gap="10px"
              >
                <Avatar src={`http://localhost:5000/${user.avatar[0].path}`} name={user.name} />
                {user.name ? `${user.name}` : `${user.name}`}
              </Text>
            </ListItem>
            <ListItem>
              <Link to="/myrequests">
                <Text
                  textColor={"purple.400"}
                  fontSize={"20px"}
                  fontWeight={"bold"}
                  bgGradient="linear(to-l,#7928CA,#FF0080)"
                  bgClip={"text"}
                >
                  Requests{" "}
                  <span style={{ fontWeight: "bold", fontSize: "22px" }}>
                    {req}
                  </span>{" "}
                </Text>
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/profile">
                <Text
                  textColor={"purple.400"}
                  fontSize={"20px"}
                  fontWeight={"bold"}
                  bgGradient="linear(to-l,#7928CA,#FF0080)"
                  bgClip={"text"}
                >
                  Profile
                </Text>
              </Link>
            </ListItem>
            <ListItem>
              <Button onClick={handleLogout} colorScheme="purple">
                Logout
              </Button>
            </ListItem>
          </List>
          <Button
            display={{ base: "inline-block", md: "none", xl: "none" }}
            float={"rignt"}
            onClick={onOpen}
            colorScheme="purple"
          >
            <Icon as={HamburgerIcon} />
          </Button>
          <Drawer
            display={{ base: "flex", md: "none", xl: "none" }}
            isOpen={isOpen}
            onClose={onClose}
            placement="top"
          >
            {/* <DrawerOverlay /> */}
            <DrawerContent
              size="xl"
              height="200px"
              mt={"75px"}
              style={{ background: "rgb(6, 7, 3)" }}
              borderX={"2px solid purple"}
              borderBottom={"2px solid purple"}
            >
              <List
                display={{ base: "flex", xl: "none", md: "none" }}
                gap="20px"
                flexDirection={"column"}
                px="10px"
              >
                <ListItem borderBottom={"2px solid purple"}>
                  <Text textColor={"purple.400"} display="flex" alignItems={"center"} gap="10px" textDecor={"coral"}>
                    <Avatar src={`http://localhost:5000/${user.avatar[0].path}`} name={user.name}/>
                    {user.name ? `${user.name}` : ""}
                  </Text>
                </ListItem>
                <ListItem borderBottom={"2px solid purple"}>
                  <Link to="/myrequests">
                    <Text textColor={"purple.400"}>
                      Requests{" "}
                      <span style={{ fontWeight: "bold", fontSize: "22px" }}>
                        {req}
                      </span>{" "}
                    </Text>
                  </Link>
                </ListItem>
                <ListItem borderBottom={"2px solid purple"}>
                  <Link to={"/profile"}>
                    <Text textColor={"purple.400"}>Profile</Text>
                  </Link>
                </ListItem>
                <ListItem>
                  <Button
                    size={{ base: "sm" }}
                    colorScheme="purple"
                    onclick={handleLogout}
                  >
                    logout
                  </Button>
                </ListItem>
              </List>
            </DrawerContent>
          </Drawer>
        </Flex>
      ) : (
        ""
      )}
    </div>
  );
};

export default Nav;
