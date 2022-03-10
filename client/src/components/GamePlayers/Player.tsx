import React, { useEffect, useState } from "react";
import { getUser } from "../../api/user";
import { UserI } from "../../types/User";
import * as Styles from "./styles";
function Player({ userId, turn }: { userId: string; turn: string }) {
  const [user, setUser] = useState<UserI | null>();
  useEffect(() => {
    (async () => {
      const data = await getUser(userId);
      setUser(data);
    })();
  });
  return (
    <Styles.UserStyle bgColor={user?._id === turn ? " #7ff" : " #f5f5f5"}>
      <span>{user?.username}</span>
    </Styles.UserStyle>
  );
}

export default Player;
