import { Tab, Tabs } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FriendRequestTab from "./FriendRequestTab";
import RequestFriendTab from "./RequestFriendTab";
import { capitalCase } from "change-case";

function FriendRequests() {
  const [currentTab, setCurrentTab] = useState("friend_request");
  const CURRENT_TAB = [
    {
      value: "friend_request",
      icon: <PersonAddIcon sx={{ frontSize: 24 }} />,
      component: <FriendRequestTab />,
    },
    {
      value: "requested_friend",
      icon: <PeopleAltIcon sx={{ frontSize: 24 }} />,
      component: <RequestFriendTab />,
    },
  ];

  return (
    <Container>
      <Tabs
        value={currentTab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={(e, value) => setCurrentTab(value)}
      >
        {CURRENT_TAB.map((tab) => (
          <Tab
            disableRipple
            key={tab.value}
            label={capitalCase(tab.value)}
            icon={tab.icon}
            value={tab.value}
          />
        ))}
      </Tabs>
      <Box mb={5} />
      {CURRENT_TAB.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Container>
  );
}

export default FriendRequests;
