import {
  Card,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "../../components/SearchInput";
import { getFriendRequest } from "./friendSlice";
import UserCard from "./UserCard";

function FriendRequestTab() {
  const dispatch = useDispatch();
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(1);

  const { currentPageUsers, usersById, totalPages, totalUsers } = useSelector(
    (state) => state.friend
  );

  const users = currentPageUsers.map((userId) => usersById[userId]);

  useEffect(() => {
    dispatch(getFriendRequest({ page, filterName }));
  }, [page, dispatch, filterName]);

  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Friend Requests
      </Typography>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction={{ sx: "column", md: "row" }} alignItems="center">
            <SearchInput handleSubmit={handleSubmit} />
            <Typography
              variant="subtitle"
              sx={{ color: "text.secondary", ml: 1 }}
            >
              {totalUsers > 1
                ? `${totalUsers} Friend Requests found`
                : totalUsers === 1
                ? `${totalUsers} Friend Request found`
                : "No Friend Request found"}
            </Typography>
          </Stack>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, page) => setPage(page)}
          />
        </Stack>
        <Grid container spacing={3} my={1}>
          {users.map((user) => (
            <Grid key={user._id} item xs={12} md={4}>
              <UserCard profile={user} />
            </Grid>
          ))}
        </Grid>
      </Card>
    </Container>
  );
}

export default FriendRequestTab;
