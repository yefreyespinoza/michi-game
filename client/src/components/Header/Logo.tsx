import { Link } from "react-router-dom";
import icons from "./../../assets/svg/icons.svg";
const logoicon = icons + "#logo";

const Logo = (props: { link: any }) => {
  return (
    <div className="logo">
      <Link to={props.link}>
        <svg width="60" height="46">
          <use href={logoicon} />
        </svg>
      </Link>
    </div>
  );
};

export default Logo;
