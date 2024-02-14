import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axiosInstance from "../../Helper/axiosInstance";
import { useNavigate } from "react-router-dom";

const Writefeed = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [feed, setFeed] = useState({
    feed: "",
    img:null
  });
  const postFeed = async () => {
    let feedPost = await axiosInstance.post("/feed/write", feed, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    if (feedPost) {
      navigate("/home/feeds");
    }
  };
  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.type === "file" ? e.target.files[0] : e.target.value;

    setFeed({ ...feed, [name]: value });
  };
  return (
    <Flex justifyContent={"center"}>
      <FormControl w="90%">
        <FormLabel color={"purple.300"}>Write here</FormLabel>
        <Textarea
          name="feed"
          onChange={handleChange}
          borderColor={"purple.300"}
          border="2px solid"
          _focus={{ border: "2px solid purple" }}
          color={"purple.300"}
          h="200px"
        ></Textarea>
        <Box display={"flex"} alignItems={"center"} gap="10px" py="5px">
          <FormLabel width={"150px"}>Upload image :</FormLabel>
          <Input type="file" name="img" colorScheme="purple" border="none" onChange={handleChange} />
        </Box>
        <Button onClick={postFeed} colorScheme="purple" my="10px">
          POST
        </Button>
      </FormControl>
    </Flex>
  );
};

export default Writefeed;
