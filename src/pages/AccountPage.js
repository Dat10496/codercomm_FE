import React, { useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShareIcon from "@mui/icons-material/Share";
import AccountGeneral from "../features/user/AccountGeneral";
import AccountSocialLink from "../features/user/AccountSocialLink";
import { capitalCase } from "change-case";
import { Container } from "@mui/system";
import { Box, Tab, Tabs, Typography } from "@mui/material";

function AccountPage() {
  const [currentTab, setCurrentTab] = useState("general");
  const CURRENT_TAB = [
    {
      value: "general",
      icon: <AccountBoxIcon sx={{ fontSize: 30 }} />,
      component: <AccountGeneral />,
    },
    {
      value: "social_link",
      icon: <ShareIcon sx={{ fontSize: 30 }} />,
      component: <AccountSocialLink />,
    },
  ];
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Account Settings
      </Typography>
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

export default AccountPage;
