import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Profile from "../features/user/Profile";
import FriendList from "../features/friend/FriendList";
import FriendRequests from "../features/friend/FriendRequests";
import AddFriend from "../features/friend/AddFriend";
import { Box, Card, Container, Tab, Tabs } from "@mui/material";
import { capitalCase } from "change-case";
import ProfileCover from "../features/user/ProfileCover";
import { styled } from "@mui/material/styles";

const TabWrapperStyle = styled("div")(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: "100%",
  display: "flex",
  position: "absolute",
  backgroundColor: "#fff",
  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-end",
    paddingRight: theme.spacing(3),
  },
}));

function HomePage() {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState("profile");
  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const PROFILE_TAB = [
    {
      value: "profile",
      icon: <AccountBoxIcon sx={{ fontSize: 24 }} />,
      component: <Profile profile={user} />,
    },
    {
      value: "friend",
      icon: <PeopleAltIcon sx={{ fontSize: 24 }} />,
      component: <FriendList />,
    },
    {
      value: "requests",
      icon: <ContactMailIcon sx={{ fontSize: 24 }} />,
      component: <FriendRequests />,
    },
    {
      value: "add_friend",
      icon: <PersonAddIcon sx={{ fontSize: 24 }} />,
      component: <AddFriend />,
    },
  ];

  return (
    <Container>
      <Card sx={{ mb: 3, height: 280, position: "relative" }}>
        <ProfileCover profile={user} />
        <TabWrapperStyle>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={(e, value) => handleChangeTab(value)}
          >
            {PROFILE_TAB.map((tab) => (
              <Tab
                disableFocusRipple
                value={tab.value}
                key={tab.value}
                icon={tab.icon}
                label={capitalCase(tab.value)}
              ></Tab>
            ))}
          </Tabs>
        </TabWrapperStyle>
      </Card>
      {PROFILE_TAB.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Container>
  );
}

export default HomePage;
