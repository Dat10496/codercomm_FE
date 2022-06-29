import React from "react";
import { Link as RouterLink } from "react-router-dom";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import useAuth from "../../hooks/useAuth";
import ActionButton from "./ActionButton";
import { Avatar, Card } from "@mui/material";

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
    </Card>
  );
}

export default UserCard;
