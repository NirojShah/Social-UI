import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axiosInstance from "../../Helper/axiosInstance";
import { Typewriter, Cursor } from "react-simple-typewriter";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { idInitializer } from "../../Feature/navFeatures";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [show, setShow] = useState(false);
  let [loginData, setLoginData] = useState({
    password: "",
    email: "",
  });
  let [signupData, setSignupData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    avatar: null,
  });

  const handleShow = () => {
    setShow(!show);
  };
  const handleChangeSignup = (e) => {
    let name = e.target.name;
    let value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setSignupData({ ...signupData, [name]: value });
  };
  const handleSignup = async () => {
    try{
      const res = await axiosInstance.post("/user/signup", signupData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Accout created Successfully")
    }catch(error){
      toast.error("SORRY ! Failed to create account..")
    }
  };
  const handleChangeLogin = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleLogin = async () => {
    try {
      let response = await axiosInstance.post("/user/login", loginData);
      if (response) {
        dispatch(idInitializer({ id: response.data.data.existingUser._id }));
        localStorage.setItem("id", response.data.data.existingUser._id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.data.existingUser.name);
        toast.success("Logged in successfully.");
        setTimeout(() => {
          navigate("/home/chats");
        }, 2000);
      }
    } catch (error) {
      toast.error("Authentication Failed.");
    }
  };
  return (
    <>
      <Flex h="150px" alignItems={"center"} justify="center">
        <Box>
          <Heading
            bgGradient="linear(to-l,#7928CA,#FF0080)"
            bgClip={"text"}
            textAlign={"center"}
            textTransform={"uppercase"}
          >
            TextApp welcomes you
          </Heading>
          <Heading display={"flex"} w="100%">
            <Text
              fontSize={{ base: "15px", md: "25px", xl: "30px" }}
              w="45vw"
              textAlign={"right"}
              textColor={"white"}
            >
              Here you can
            </Text>
            <Text
              fontSize={{ base: "15px", md: "25px", xl: "30px" }}
              w="45vw"
              color={"purple.600"}
              px="10px"
            >
              <Typewriter
                words={["Send Messages.", "Read Feeds.", "Make Friends."]}
                loop={false}
                cursorStyle="<"
                cursorColor="purple.600"
                cursorBlinking={true}
                typeSpeed={150}
                deleteSpeed={150}
              ></Typewriter>
              <Cursor />
            </Text>
          </Heading>
        </Box>
      </Flex>
      <Tabs
        display={"flex"}
        variant={"soft-rounded"}
        colorScheme="purple"
        flexDirection={"column"}
      >
        <TabList w="100%" justifyContent={"center"}>
          <Tab>Login</Tab>
          <Tab>Signup</Tab>
        </TabList>
        <TabPanels>
          <TabPanel
            display="flex"
            alignItems={"center"}
            justifyContent={"center"}
          >
            <FormControl
              boxShadow={"dark-lg"}
              borderRadius={"10px"}
              w={{ base: "90%", md: "60%", xl: "45%" }}
              h="auto"
              px="20px"
              py="20px"
              isRequired
            >
              <Box>
                <FormLabel display={"flex"}>
                  <Text textColor="purple.200">Email</Text>
                </FormLabel>
                <Input
                  textColor={"purple.500"}
                  onChange={handleChangeLogin}
                  type="text"
                  name="email"
                  required={true}
                ></Input>
              </Box>
              <Box>
                <FormLabel display={"flex"}>
                  <Text textColor="purple.200">Password</Text>
                </FormLabel>
                <InputGroup>
                  <Input
                    textColor={"purple.500"}
                    onChange={handleChangeLogin}
                    name="password"
                    type={show ? "text" : "password"}
                    required={true}
                  ></Input>
                  <InputRightElement>
                    <Button
                      size="md"
                      colorScheme={show ? "blue" : "purple"}
                      onClick={handleShow}
                    >
                      {show ? "hide" : "show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
              <Box>
                <Button
                  my="20px"
                  w="150px"
                  colorScheme="purple"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </Box>
            </FormControl>
          </TabPanel>
          <TabPanel
            display="flex"
            alignItems={"center"}
            justifyContent={"center"}
          >
            <FormControl
              boxShadow={"dark-lg"}
              borderRadius={"10px"}
              w={{ base: "90%", md: "60%", xl: "45%" }}
              h="auto"
              px="20px"
              py="20px"
              isRequired
            >
              <Box>
                <FormLabel display={"flex"}>
                  <Text color={"purple.500"}>Full Name</Text>
                </FormLabel>
                <Input
                  name="name"
                  type="text"
                  required={true}
                  onChange={handleChangeSignup}
                ></Input>
              </Box>
              <Box>
                <FormLabel display={"flex"}>
                  <Text color={"purple.500"}>Phone No</Text>
                </FormLabel>
                <Input
                  name="phone"
                  type="number"
                  required={true}
                  onChange={handleChangeSignup}
                ></Input>
              </Box>
              <Box>
                <FormLabel display={"flex"}>
                  <Text color={"purple.500"}>Email</Text>
                </FormLabel>
                <Input
                  name="email"
                  type="text"
                  required={true}
                  onChange={handleChangeSignup}
                ></Input>
              </Box>
              <Box>
                <FormLabel display={"flex"}>
                  <Text color={"purple.500"}>Password</Text>
                </FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={show ? "text" : "password"}
                    required={true}
                    onChange={handleChangeSignup}
                  ></Input>
                  <InputRightElement>
                    <Button
                      size="md"
                      colorScheme={show ? "blue" : "purple"}
                      onClick={handleShow}
                    >
                      {show ? "hide" : "show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
              <Box>
                <FormLabel display={"flex"}>
                  <Text color="purple.500">Profile Picture</Text>
                </FormLabel>
                <Input
                  type="file"
                  name="avatar"
                  border={"none"}
                  onChange={handleChangeSignup}
                />
              </Box>
              <Box>
                <Button
                  my="20px"
                  w="150px"
                  colorScheme="purple"
                  onClick={handleSignup}
                >
                  signup
                </Button>
              </Box>
            </FormControl>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Toaster />
    </>
  );
};

export default Login;
