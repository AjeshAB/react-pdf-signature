import styled from 'styled-components'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  font-family: sans-serif;
`

const Content = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  position: relative;
`

const Header = styled.div`
  font-size: 1.5rem;
  margin-bottom: 10px;
`

const Body = styled.div`
  margin-bottom: 20px;
`

const Footer = styled.div`
  text-align: right;
`

const CloseButton = styled.button`
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`

export { Overlay, Content, Header, Body, Footer, CloseButton }
