import styled from "styled-components";
import DarkModeSwitch from "./components/DarkModeSwitch";
import Search from "./components/Search";

const StyledMenu = styled.header`
  display: flex;
  flex-direction: row;
  height: 56px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.backgroundLevel1 || "#FFFFFF"};
  border: 1px solid ${({ theme }) => theme.borderBase || "#e5e5e5"};
  align-items: center;
  padding: 0 16px;
  gap: 16px;
  position: fixed;
  width: 100%;
  .logo {
    width: 100%;
    max-width: 38px;
    @media (max-width: 600px) {
      max-width: 30px;
    }
}
    .title {
        display: flex;
        font-size: 22px;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        height: 56px;
        top: 0px;
        align-items: center;
        @media (max-width: 600px) {
            display: none;
        }
    }

    .logoBox{
        display: flex;
        align-items: center
    }
`;

export default function Menu({ valorDoFiltro, setValorDoFiltro }) {
    return (
        <StyledMenu>
            <Logo />
            <Search vaalorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
            <DarkModeSwitch />
        </StyledMenu>
    );
}

function Logo() {
    return (
        <div className="logoBox">
            <img className="logo" src="https://rotony.com.br/wp-content/uploads/2021/09/free-youtube-logo-icon-2431-thumb.png" />
            <span className="title">PoTube</span>
        </div>
    )
}