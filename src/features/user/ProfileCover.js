import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import useAuth from "../../hooks/useAuth";
import FriendStatus from "../friend/FriendStatus";
import { styled } from "@mui/material/styles";

const RootStyle = styled("div")(({ theme }) => ({
  "&:before": {
    backdropFilter: `blur(1px)`,
    top: 0,
    zIndex: 9,
    content: "''",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
}));

const InfoStyle = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: "absolute",
  marginTop: theme.spacing(5),
  [theme.breakpoints.up("md")]: {
    right: "auto",
    display: "flex",
    alignItems: "center",
    left: theme.spacing(5),
    bottom: theme.spacing(3),
  },
}));

function ProfileCover({ profile }) {
  const { user } = useAuth();
  const currentUserId = user._id;
  const {
    id_: targetUserId,
    name,
    jobTitle,
    coverUrl,
    avatarUrl,
    friendship,
  } = profile;

  const friendStatus = (
    <FriendStatus
      currentUserId={currentUserId}
      targetUserId={targetUserId}
      friendship={friendship}
    />
  );

  const handleError = (e) => {
    const indexImg = Math.floor(Math.random() * 5) + 1;

    e.target.src = `/covers/cover_${indexImg}.jpg`;
    e.target.onError = null;
  };

  return (
    <RootStyle>
      <InfoStyle>
        <Avatar
          src={avatarUrl}
          alt={name}
          sx={{
            mx: "auto",
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "common.white",
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
          }}
        />

        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            mb: 2,
            color: "common.white",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography variant="h5">{name}</Typography>
          <Typography sx={{ opacity: 0.72 }}>{jobTitle}</Typography>
          {friendStatus}
        </Box>
      </InfoStyle>
      <Box sx={{ overflow: "hidden" }}>
        <img
          src={coverUrl}
          alt="profile cover"
          width="100%"
          height="100%"
          onError={handleError}
        />
      </Box>
    </RootStyle>
  );
}

export default ProfileCover;
