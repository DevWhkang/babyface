import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700&family=Noto+Sans+KR:wght@500&display=swap');
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Nanum Gothic', sans-serif;
  }
`;

export const Container = styled.div`
  z-index: 1;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 5vw;
  padding-left: 5vw;
`;

export const Button = styled.button`
  border-radius: 6px;
  background: #db7093;
  white-space: nowrap;
  padding: ${({ big }) => (big ? '2% 8%' : '10px 20px')};
  color: #fff;
  font-size: ${({ fontBig }) => (fontBig ? '1rem' : '15px')};
  outline: none;
  border: none;
  cursor: pointer;

  &:hover {
    transition: all 0.1s ease;
    background: #fffafa;
    color: #db7093;
    border: 3px solid #db7093;
  }

  @media screen and (max-width: 960) and (max-width: 414px) {
    width: 100%;
  }
`;

export default GlobalStyle;
