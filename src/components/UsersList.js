import { useEffect } from "react";
import { useSelector } from "react-redux";
import { addUser, fetchUser } from "../store";
import Skeletons from "./Skeletons";
import Button from "./Button";
import { useThunk } from "../hooks/use-thunk";
import UsersListItem from "./UsersListItem";

function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUser);
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  const { data } = useSelector((state) => {
    return state.users;
  });
  const handleUserAdd = () => {
    doCreateUser();
  };

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  let content;
  if (isLoadingUsers) {
    content = <Skeletons times={6} className="h-10 w-full" />;
  } else if (loadingUsersError) {
    content = <div>Error fetching data......</div>;
  } else {
    content = data.map((user) => {
        return <UsersListItem key={user.id} user={user}/> });

  }

  return (
    <div>
      <div className="flex flex-row justify-between m-3 items-center">
        <h1 className="m-2 text-xl"> Users</h1>
        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          + Add User
        </Button>
        {creatingUserError && "Error creating user........"}
      </div>
      <div>{content}</div>
    </div>
  );
}

export default UsersList;
