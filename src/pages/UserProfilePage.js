import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getUser } from "../features/user/userSlice";
import { Container, Card } from "@mui/material";
import LoadingScreen from "../components/LoadingScreen";
import ProfileCover from "../features/user/ProfileCover";
import Profile from "../features/user/Profile";

function UserProfilePage() {
  const params = useParams();
  const userId = params.userId;
  const dispatch = useDispatch();
  const { isLoading, selectedUser } = useSelector(
    (state) => state.user,
    shallowEqual
  );

  useEffect(() => {
    if (userId) {
      dispatch(getUser({ userId }));
    }
  }, [dispatch, userId]);

  return (
    <Container spacing={2}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Card sx={{ mb: 3, height: 280, position: "relative" }}>
            {selectedUser && <ProfileCover profile={selectedUser} />}
          </Card>
          {selectedUser && <Profile profile={selectedUser} />}
        </>
      )}
    </Container>
  );
}

export default UserProfilePage;
