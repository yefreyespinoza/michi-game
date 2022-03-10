import styled from "styled-components";
import User from "./User";
interface UserIn {
  username: string;
  userId: string;
}
interface Props {
  users?: UserIn[];
  tableId: string;
  tableName: string;
}
const Oponents = (props: Props) => {
  let { users, tableId, tableName } = props;
  return (
    <Container>
      <Ul>
        {users &&
          users.map((item, index) => {
            return (
              <User
                tableName={tableName}
                key={index}
                tableId={tableId}
                username={item.username}
                id={item.userId}
              />
            );
          })}
      </Ul>
    </Container>
  );
};

export default Oponents;

//styles
const { div, ul } = styled;

const Container = div`
  margin-top: 20px;
`;

const Ul = ul`
  display: flex;
  width: 90%;
  margin: auto;
  flex-direction: column;
  @media (min-width: 700px) {
    width: 50%;
  }
  @media (min-width: 1000px) {
    width: 40%;
  }
`;
