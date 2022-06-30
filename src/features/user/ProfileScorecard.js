import { Card, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { fNumber } from "../../utils/numberFormat";

function ProfileScorecard({ profile }) {
  const { postCount, friendCount } = profile;
  // console.log(fNumber(20));
  return (
    <Card sx={{ py: 3 }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack width={1} textAlign="center">
          <Typography variant="h4">{friendCount}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Friend
          </Typography>
        </Stack>
        <Stack width={1} textAlign="  center">
          <Typography variant="h4">{postCount}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Post
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

export default ProfileScorecard;
