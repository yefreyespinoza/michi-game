import Logo from "../Header/Logo";
import { ToastContainer } from "react-toastify";

import { HeaderContainer } from "../Header/styleBit";
const HeaderLogin = () => {
  return (
    <HeaderContainer>
      <ToastContainer />
      <div className="logo">
        <Logo link={{}} />
      </div>
    </HeaderContainer>
  );
};

export default HeaderLogin;
