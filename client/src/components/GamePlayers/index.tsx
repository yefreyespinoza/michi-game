import React from "react";
import Player from "./Player";
import * as Styles from "./styles";
function GamePlayers({
  user1,
  user2,
  turn,
  tableName,
}: {
  user1: string;
  user2: string;
  turn: string;
  tableName: string;
}) {
  return (
    <Styles.Container>
      <Styles.PlayersContainer>
        <Player userId={user1} turn={turn} />
        <span>vs</span>
        <Player userId={user2} turn={turn} />
        <Styles.TableName>{tableName}</Styles.TableName>
      </Styles.PlayersContainer>
      <Styles.TurnContainer style={{ display: "flex" }}>
        turno de{" "}
        {user1 === turn ? (
          <Player userId={user1} turn={turn} />
        ) : (
          <Player userId={user2} turn={turn} />
        )}
      </Styles.TurnContainer>
    </Styles.Container>
  );
}

export default GamePlayers;
