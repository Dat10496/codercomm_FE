import {
  Avatar,
  Box,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link as RouterLink } from "react-router-dom";
import FriendStatus from "./FriendStatus";
import ActionButton from "./ActionButton";

function UserTable({ users }) {
  const { user } = useAuth();
  const currentUserId = user._id;

  const getActionAndStatus = (targetUser) => {
    const prop = {
      currentUserId: currentUserId,
      targetUserId: targetUser._id,
      friendship: targetUser.friendship,
    };
    return {
      status: <FriendStatus {...prop} />,
      action: <ActionButton {...prop} />,
    };
  };

  return (
    <Box sx={{ overflow: "auto" }}>
      <TableContainer sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: { sx: "20%", sm: "25%" } }}>
                Name
              </TableCell>
              <TableCell sx={{ width: { sx: "none%", sm: "table-cell" } }}>
                Email
              </TableCell>
              <TableCell sx={{ width: { sx: "none%", sm: "table-cell" } }}>
                Job Title
              </TableCell>
              <TableCell
                sx={{ width: { sx: "none%", sm: "table-cell" }, width: "20%" }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{ width: { sx: "none%", sm: "table-cell" }, width: "20%" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              const { action, status } = getActionAndStatus(user);

              return (
                <TableRow key={user._id} hover>
                  <TableCell
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Avatar
                      src={user.avatarUrl}
                      alt={user.name}
                      sx={{ mr: 2 }}
                    />
                    <Link
                      sx={{ fontWeight: 600 }}
                      variant="subtitle2"
                      component={RouterLink}
                      to={`user/${user._id}`}
                    >
                      {user.name}
                    </Link>
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ display: { sx: "none", md: "table-cell" } }}
                  >
                    {user.email}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ display: { sx: "none", md: "table-cell" } }}
                  >
                    {user.jobTitle}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ display: { sx: "none", md: "table-cell" } }}
                  >
                    {status}
                  </TableCell>
                  <TableCell align="left">{action}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default UserTable;
