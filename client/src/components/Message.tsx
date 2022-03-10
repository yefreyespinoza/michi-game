import styled from "styled-components";
interface PropsInterface {
  text: string;
  down?: boolean;
}
const Message = (props: PropsInterface) => {
  return (
    <Container className={props.down ? "down" : ""}>
      <TextMessage className={props.down ? "down" : ""}>
        <Name>yefrey</Name>
        {props.text}
      </TextMessage>
    </Container>
  );
};
export default Message;
const { div, span } = styled;
const Container = div`
  position: relative;
  text-align: left;
  max-width: 75%;
  margin: 10px 0;
  &.down {
    left: 100%;
    transform: translateX(-100%);
    text-align: right;
  }
`;
const Name = span`
  position: absolute;
  color: #fff;
  font-size: 10px;
  .down {
    color: #000;
  }
`;

const TextMessage = span`
  display: inline-block;
  background: #934;
  border-radius: 5px;
  padding: 5px;
  margin-left: 5px;
  color: #fff;
  &.down {
    background: #7ff;
    margin-right: 5px;
    color: #000;
  }
`;
