import React, { useEffect } from "react";
import axiosInstance from "../../Helper/axiosInstance";
import Nav from "../Nav Bar/Nav";
import { Heading, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Myfriends from "../Friends/Myfriends";
import Feeds from "../Feeds/Feeds";
import AllUsers from "../Friends/AllUsers";
import { Link, Outlet } from "react-router-dom";

const Home = () => {
  const id = localStorage.getItem("id");
  return (
    <>
      <Nav />
      <Spacer></Spacer>
      <Tabs variant={"soft-rounded"} colorScheme="purple" justifyContent={"center"}>
        <TabList justifyContent={"center"} w="100%">
            <Tab>
              <Link to="/home/chats">Chats</Link>
            </Tab>
            <Tab>
              <Link to="/home/friends">Friends</Link>
            </Tab>
            <Tab>
              <Link to="/home/feeds">Feeds</Link>
            </Tab>
        </TabList>
        <TabPanels w="90%">
        <Outlet/>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Home;
