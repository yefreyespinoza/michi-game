import styled from "styled-components";
import { Send } from "@material-ui/icons";
import { ChangeEvent, FormEventHandler } from "react";
const InputMessage = ({
  onchange,
  click,
  value,
}: {
  onchange: (event: ChangeEvent<HTMLInputElement>) => void;
  click: FormEventHandler<HTMLFormElement | undefined>;
  value: string;
}) => {
  return (
    <Container>
      {/* */}
      <Form onSubmit={value ? click : (e) => e.preventDefault()}>
        <Input
          value={value}
          onChange={onchange}
          type="text"
          placeholder="Type a message..."
        />
        {value && (
          <Button type="submit">
            <Send />
          </Button>
        )}
      </Form>
    </Container>
  );
};
export default InputMessage;

const Container = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: #fdf;
  border-top: 1px solid #444;
`;
const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Input = styled.input`
  flex: 1;
  height: 40px;
  border: 1px solid #000;
  border-radius: 50px;
  margin: 0px 10px;
  outline: none;
  padding: 0px 10px;
`;

const Button = styled.button`
  flex-shink: 0;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: #7770;
  color: #000;
  margin: 0px 10px;
  outline: none;
  cursor: pointer;
`;
