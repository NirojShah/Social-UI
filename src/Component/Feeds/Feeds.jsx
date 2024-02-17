import React, { useState } from "react";
import axiosInstance from "../../Helper/axiosInstance";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Flex,
  Heading,
  Icon,
  Img,
  Text,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { HashLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";

const Feeds = () => {
  const token = localStorage.getItem("token");
  let [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState("");
  useState(() => {
    let fetchFeed = async () => {
      let { data } = await axiosInstance.get("/feed", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFeeds(data.data.feeds);
      setLoading(false);
    };
    fetchFeed();
  }, [reload]);

  const handleRate = async (id) => {
    try {
      let data = await axiosInstance.post(`/feed/upvote/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data) {
        toast.success("Voted..");
        setReload(reload + "a");
      }
    } catch (error) {
      toast.error("Upvote Failed...");
    }
  };
  return (
    <>
      <Flex alignItems={"center"} flexDirection={"column"}>
        <Heading
          w="65%"
          bgGradient="linear(to-l,#7928CA,#FF0080)"
          bgClip={"text"}
          py="20px"
        >
          All Feeds
        </Heading>
        {loading ? (
          <HashLoader color="#cf00cf" />
        ) : (
          <>
            {feeds.map((val, key) => {
              return (
                <Card
                  w={{ base: "95%", md: "60%", xl: "60%" }}
                  border="1px solid purple"
                  borderTop={"5px solid purple"}
                  my="10px"
                  key={key}
                  size="sm"
                  bg="black"
                >
                  {/* <CardBody >
                    {val.img[0].path?<Img
                      src={`https://social-back-ffwk.onrender.com/${val.img[0].path}`} w="100%" 

                    />:""}
                  </CardBody> */}

                  <CardHeader>
                    <Text
                      bgGradient="linear(to-l,#7928CA,#FF0080)"
                      bgClip={"text"}
                    >
                      {val.userModel.name}
                    </Text>
                  </CardHeader>
                  <CardBody>
                    <Text color={"white"}>{val.feed}</Text>
                  </CardBody>
                  <CardFooter alignItems={"center"} gap="15px">
                    <Text color="white">{val.upVote}</Text>
                    <Button
                      size="sm"
                      colorScheme="purple"
                      onClick={() => {
                        handleRate(val._id);
                      }}
                    >
                      <Icon as={StarIcon} />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </>
        )}
        <Outlet />
        <Footer />
      </Flex>
      <Toaster />
    </>
  );
};

export default Feeds;
