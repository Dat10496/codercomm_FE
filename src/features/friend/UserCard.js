import React from "react";
import { Link as RouterLink } from "react-router-dom";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import useAuth from "../../hooks/useAuth";
import ActionButton from "./ActionButton";
import { Avatar, Box, Card, Link, Typography } from "@mui/material";

function UserCard({ profile }) {
  const { user } = useAuth();
  const currentUserId = user._id;
  const { _id: targetUserId, name, avatarUrl, email, friendship } = profile;

  const actionButton = (
    <ActionButton
      currentUserId={currentUserId}
      targetUserId={targetUserId}
      friendship={friendship}
    />
  );
  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 3 }}>
      <Avatar src={avatarUrl} alt={name} sx={{ width: 48, height: 48 }} />
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Link
          variant="subtitle2"
          component={RouterLink}
          to={`user/${targetUserId}`}
          sx={{ fontWeight: 600 }}
        >
          {name}
        </Link>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <EmailRoundedIcon
          sx={{ height: 16, width: 16, mr: 0.5, flexShrink: 0 }}
        />
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {email}
        </Typography>
      </Box>
      {actionButton}
    </Card>
  );
}

export default UserCard;
