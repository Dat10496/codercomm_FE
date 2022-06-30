import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { styled } from "@mui/material/styles";
import { Card, CardHeader, Link, Stack, Box } from "@mui/material";

const IconStyle = styled(Box)(({ theme }) => ({
  width: 20,
  height: 20,
  marginLeft: 1,
  flexShrink: 1,
  marginRight: theme.spacing(2),
}));

function ProfileSocialInfo({ profile }) {
  const { facebookLink, instagramLink, linkedinLink, twitterLink } = profile;

  const SOCIAL = [
    {
      name: "Linkedin",
      icon: (
        <IconStyle color="#006097">
          <LinkedInIcon />
        </IconStyle>
      ),
      href: linkedinLink,
    },
    {
      name: "Instagram",
      icon: (
        <IconStyle color="#f22e45 ">
          <InstagramIcon />
        </IconStyle>
      ),
      href: instagramLink,
    },
    {
      name: "Facebook",
      icon: (
        <IconStyle color="#006097">
          <FacebookIcon />
        </IconStyle>
      ),
      href: facebookLink,
    },
    {
      name: "Twitter",
      icon: (
        <IconStyle color="#0f83f7">
          <TwitterIcon />
        </IconStyle>
      ),
      href: twitterLink,
    },
  ];
  return (
    <Card>
      <CardHeader title="Social" />
      <Stack spacing={2} p={3}>
        {SOCIAL.map((link) => (
          <Stack key={link.name} direction="row" alignItems="center">
            {link.icon}
            <Link
              component="span"
              variant="body2"
              color="text.secondary"
              noWrap
            >
              {link.href}
            </Link>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

export default ProfileSocialInfo;
