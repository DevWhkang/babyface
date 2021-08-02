import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RiMenu3Fill } from 'react-icons/ri';
import { TiTimes } from 'react-icons/ti';
import { IconContext } from 'react-icons/lib';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { Container } from './GlobalStyles';
import {
  changeModalState,
  changeVisitedState,
} from '../../modules/actions/user';

const NavWrapper = styled.nav`
  background: rgba(255, 192, 203, 0.2);
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: sticky;
  top: 0;
  z-index: 999;
`;

const NavBarContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  height: 80px;

  ${Container}
`;

const NavLogo = styled(Link)`
  justify-content: flex-start;
  cursor: pointer;
  font-size: 1.8rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  color: #8b008b;
`;

const NavIcon = styled.img`
  width: 35px;
  margin-right: 0.8rem;
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;

  @media screen and (max-width: 756px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    position: absolute;
    left: 0;
    top: ${({ click }) => (click ? '80px' : '-1200%')};
    transition: all 0.8s ease-in-out;
    background-color: rgb(255, 250, 250, 0.9);
  }
`;

const NavItem = styled.li`
  height: 80px;

  @media screen and (max-width: 756px) {
    width: 100%;
  }
`;

const NavLinks = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  height: 100%;
  font-size: 1rem;
  font-weight: bold;
  color: ${({ visited, index }) => (visited === index ? '#DB7093' : '#8B008B')};

  &:hover {
    color: #db7093;
  }

  @media screen and (max-width: 756px) {
    text-align: center;
    padding: 2rem;
    width: 100%;
    display: table;
  }
`;

const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 756px) {
    display: block;
    position: absolute;
    top: 11px;
    right: 5px;
    transform: translate(-100%, 60%);
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

const menus = [
  { id: 1, title: '마이페이지', link: '/mypage/order' },
  { id: 2, title: '회원가입', link: '/sign-up' },
  { id: 3, title: '로그인', link: '/login' },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const loginResponse = useSelector((state) => state.user.loginResponse);
  const visited = useSelector((state) => state.user.visitedPage);
  const [click, setClick] = useState(false);
  const [, setButton] = useState(true);

  const filterLinks = (item, index) => {
    if (item.id === 3 && loginResponse) {
      return (
        <NavItem key={index}>
          <NavLinks
            index={index}
            visited={visited}
            onClick={() => handleClickVisited(index)}
            to="/logout"
          >
            로그아웃
          </NavLinks>
        </NavItem>
      );
    }
    return (
      <NavItem key={index}>
        <NavLinks
          index={index}
          visited={visited}
          onClick={() => handleClickVisited(index)}
          to={item.link}
        >
          {item.title}
        </NavLinks>
      </NavItem>
    );
  };

  const handleClick = () => {
    setClick(!click);
  };

  const handleClickVisited = (linkIndex) => {
    dispatch(changeVisitedState(linkIndex));
    // logout request
    if (loginResponse && linkIndex === 2) dispatch(changeModalState(true));
    if (!loginResponse && linkIndex === 0) dispatch(changeModalState(true));
  };

  const showButton = () => {
    if (window.innerWidth <= 414) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <IconContext.Provider value={{ color: '#C0C0C0' }}>
      <NavWrapper>
        <NavBarContainer>
          <NavLogo to="/">
            <NavIcon src={logo} alt="Logo" />
            Babyface
          </NavLogo>
          <MobileIcon onClick={handleClick}>
            {click ? <TiTimes /> : <RiMenu3Fill />}
          </MobileIcon>

          <NavMenu onClick={handleClick} click={click}>
            {menus.map((item, index) => filterLinks(item, index))}
          </NavMenu>
        </NavBarContainer>
      </NavWrapper>
    </IconContext.Provider>
  );
};

export default Navbar;
