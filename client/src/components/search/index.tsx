import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import { NotificationsContext } from "../../context/notifications/NotificationsContext";
import { CircularProgress } from "@material-ui/core";
import { AuthContext } from "../../context/auth/AuthContext";

interface User {
  username: string;
  id: string;
}
interface UsersData {
  loading: boolean;
  data: User[] | [];
}
const SearchBar = ({ placeholder }: { placeholder?: string }) => {
  const { socketTable, socket } = useContext(NotificationsContext);
  const { user } = useContext(AuthContext);
  const [usersData, setUsersData] = useState<UsersData>({
    loading: false,
    data: [],
  });
  const [wordEntered, setWordEntered] = useState("");
  const resDataRef = React.createRef<any>();
  const searchDataRef = React.createRef<any>();
  const handleClickOutsideResult = (e: any) => {
    if (resDataRef && searchDataRef) {
      !resDataRef.current?.contains(e.target) &&
        !searchDataRef.current?.contains(e.target) &&
        setWordEntered("");
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideResult);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideResult);
    };
  });

  useEffect(() => {
    socketTable.on("filter-users", (dt: User[] | []) => {
      setUsersData({ loading: false, data: dt });
    });
    return () => {
      setUsersData((prev) => ({ ...prev, data: [] }));
    };
  }, [socketTable]);
  const handleAddFriend = (reciverId: string) => {
    socket.emit("add-friend", {
      reciver: reciverId,
      sender: user.id,
      content: ` quiere ser tu amigo`,
      idGenerateUnique: user.id + reciverId,
      typeNotification: {
        type: "request",
        context: "request",
      },
    });
  };
  const handleFilter = (e: ChangeEvent<HTMLInputElement | HTMLFormElement>) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);

    if (searchWord === "") {
      setUsersData({ loading: false, data: [] });
    } else {
      socketTable.emit("search-user", searchWord);
      setUsersData((prev) => ({ ...prev, loading: true }));
    }
  };
  const clearInput = () => {
    setUsersData({ loading: false, data: [] });
    setWordEntered("");
  };
  return (
    <Container>
      <SearchInputs ref={searchDataRef}>
        <input
          type="text"
          value={wordEntered}
          placeholder={placeholder}
          autoComplete="false"
          onChange={handleFilter}
        />
        <SearchIconDiv>
          {usersData.data === undefined || usersData.data.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon onClick={clearInput} />
          )}
        </SearchIconDiv>
      </SearchInputs>
      {wordEntered !== "" && (
        <DataResult ref={resDataRef}>
          {!usersData.loading &&
            usersData.data.length === 0 &&
            wordEntered !== "" && <p>{wordEntered} no encontrado</p>}
          <>{usersData.loading && <CircularProgress />}</>
          {!usersData.loading && (
            <>
              {usersData.data.slice(0, 15).map((value: User, key: any) => {
                return (
                  <DataItem key={key}>
                    <p>{value.username}</p>
                    <Button onClick={() => handleAddFriend(value.id)}>
                      add friend
                    </Button>
                  </DataItem>
                );
              })}
            </>
          )}
        </DataResult>
      )}
    </Container>
  );
};

export default SearchBar;
const Container = styled.div`
  position: relative;
  flex: 1;
  margin: auto 5px;
`;
const SearchInputs = styled.div`
  display: flex;
  & input {
    padding: 10px 10px;
    background-color: white;
    border: 0;
    border-radius: 10px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    &:focus {
      outline: none;
    }
  }
`;
const SearchIconDiv = styled.div`
  width: 50px;
  background-color: white;
  display: grid;
  place-items: center;
  & > * {
    font-size: 35px;
    cursor: pointer;
  }
`;
const DataResult = styled.div`
  position: absolute;
  z-index: 100;
  width: 100%;
  margin-top: 5px;
  max-height: 200px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  overflow: hidden;
  overflow-y: auto;
  @media screen and (min-width: 700px) {
    width: 80%;
  }
  @media screen and (min-width: 900px) {
    width: 65%;
  }
  @media screen and (min-width: 1200px) {
    width: 50%;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const DataItem = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.1px solid #999;
  color: black;
  text-decoration: none;
  &:hover {
    background: lightgrey;
  }
  & p {
    margin-left: 10px;
  }
`;

const Button = styled.button`
  color: #fff;
  background: #000;
  border-radius: 10px;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;
  outline: none;
`;
