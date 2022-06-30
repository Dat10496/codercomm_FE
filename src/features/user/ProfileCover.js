import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import useAuth from "../../hooks/useAuth";
import FriendStatus from "../friend/FriendStatus";
import { styled, alpha } from "@mui/material/styles";

const RootStyle = styled("div")(({ theme }) => ({
  "&:before": {
    backdropFilter: `blur(1px)`,
    backgroundColor: alpha(theme.palette.primary.dark, 0.7),
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
    <div>
      <RootStyle>
        <InfoStyle>
          <Box
            sx={{
              ml: { md: 3 },
              mt: { xs: 1, md: 0 },
              color: "common.white",
              textAlign: { xs: "center", md: "left" },
            }}
          >
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
          </Box>
          <Box
            sx={{
              ml: { md: 3 },
              mt: { xs: 1, md: 0 },
              color: "common.white",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography variant="h5">{name}</Typography>
            <Typography sx={{ opacity: 0.72 }}>{jobTitle}</Typography>
            {friendStatus}
          </Box>
          <Box overflow="hidden">
            <img
              src={coverUrl}
              alt="profile cover"
              width="100%"
              height="100%"
              onError={handleError}
            />
          </Box>
        </InfoStyle>
      </RootStyle>
    </div>
  );
}

export default ProfileCover;
