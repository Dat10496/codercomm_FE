import React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { Card, CardHeader, Link, Stack, Typography } from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import EmailIcon from "@mui/icons-material/Email";

const IconStyle = styled(Box)(({ theme }) => ({
  width: 20,
  height: 20,
  marginLeft: 1,
  flexShrink: 1,
  marginRight: theme.spacing(2),
}));

function ProfileAbout({ profile }) {
  const { aboutMe, city, country, email, company } = profile;

  return (
    <Card>
      <CardHeader variant="h6" title="About" />
      <Stack spacing={2} p={3}>
        <Typography variant="body2"> {aboutMe}</Typography>
        <Stack direction="row">
          <IconStyle>
            <PinDropIcon />
          </IconStyle>
          <Typography variant="body2">
            <Link component="span" variant="subtitle2" color="text.secondary">
              {city} {country}
            </Link>
          </Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle>
            <BusinessCenterIcon />
          </IconStyle>
          <Typography variant="body2">
            <Link component="span" variant="subtitle2" color="text.secondary">
              {company}
            </Link>
          </Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle>
            <EmailIcon />
          </IconStyle>
          <Typography variant="body2">
            <Link component="span" variant="subtitle2" color="text.secondary">
              {email}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

export default ProfileAbout;
