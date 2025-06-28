import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../actions/userActions";
import { useEffect } from "react";

export default function UsersList() {
  const dispatch = useDispatch();

  const usersState = useSelector((state) => state.getAllUsersReducer);
  const { loading, users, error } = usersState;

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {users && users.map((user) => <div key={user._id}>{user.name}</div>)}
    </div>
  );
}
