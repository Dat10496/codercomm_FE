import { Button, Stack } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import {
  sendFriendRequest,
  acceptRequest,
  declineRequest,
  removeFriend,
  cancelRequest,
} from "./friendSlice";

function ActionButton({ currentUserId, targetUserId, friendship, sx }) {
  const dispatch = useDispatch();
  if (currentUserId === targetUserId) return null;

  const btnSendRequest = (
    <Button
      sx={{ fontSize: "0.6rem", ...sx }}
      size="small"
      variant="contained"
      onClick={() => dispatch(sendFriendRequest({ targetUserId }))}
    >
      Send Request
    </Button>
  );

  if (!friendship) return btnSendRequest;

  const btnUnfriend = (
    <Button
      sx={{ fontSize: "0.6rem", ...sx }}
      size="small"
      color="error"
      variant="contained"
      onClick={() => dispatch(removeFriend({ targetUserId }))}
    >
      Unfriend
    </Button>
  );

  const btnResend = (
    <Button
      sx={{ fontSize: "0.6rem", ...sx }}
      size="small"
      variant="contained"
      onClick={() => dispatch(sendFriendRequest({ targetUserId }))}
    >
      {friendship.from === currentUserId ? "Resend" : "Send"} Request
    </Button>
  );

  const btnCancelRequest = (
    <Button
      sx={{ fontSize: "0.6rem", ...sx }}
      size="small"
      variant="contained"
      color="error"
      onClick={() => dispatch(cancelRequest({ targetUserId }))}
    >
      Cancel Request
    </Button>
  );
  const btnGroupReact = (
    <Stack spacing={1} direction="row">
      <Button
        sx={{ fontSize: "0.6rem", ...sx }}
        size="small"
        variant="contained"
        onClick={() => dispatch(acceptRequest({ targetUserId }))}
      >
        Accept
      </Button>
      <Button
        sx={{ fontSize: "0.6rem", ...sx }}
        size="small"
        variant="contained"
        onClick={() => dispatch(declineRequest({ targetUserId }))}
      >
        Decline
      </Button>
    </Stack>
  );
  if (friendship.status === "accepted") return btnUnfriend;
  if (friendship.status === "declined") return btnResend;
  if (friendship.status === "pending") {
    const { from, to } = friendship;

    if (from === currentUserId && to === targetUserId) return btnCancelRequest;
    if (from === targetUserId && to === currentUserId) return btnGroupReact;
  }
  return btnSendRequest;
}

export default ActionButton;
