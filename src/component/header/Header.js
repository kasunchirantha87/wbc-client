import React,{useState} from 'react';
import { Navbar, Nav, Icon } from 'rsuite';
//import Nav from 'rsuite/Nav';
//import HomeIcon from '@rsuite/icons/legacy/Home';
import { SignOutIcon } from '@primer/octicons-react';
import { useKeycloak } from "@react-keycloak/web";
import '../header/Header.css';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const [active, setActive] = useState('home');
  const { keycloak } = useKeycloak();
  const [activeKey, setActiveKey] = React.useState(null);
  const navigate = useNavigate();

  function Logout(){
    keycloak.logout();
  }

  const redirectToPage = (param) => {
    if(keycloak.authenticated){
      navigate(`/${param}`);
    }
    else{
      keycloak.logout();
    }
  }

  return (
    <div>
    <Navbar>
      <Navbar.Header>
        <a href="#" className="navbar-brand">
          Wish Books Collection
        </a>
      </Navbar.Header>
      <Navbar.Body>
        <Nav>
          <Nav.Item onClick={() => redirectToPage('home')}>
            Home
          </Nav.Item>
          <Nav.Item onClick={() => redirectToPage('book')}>
            Books
          </Nav.Item>
          <Nav.Item onClick={() => redirectToPage('lending')}>
            Lending
          </Nav.Item>
        </Nav>
        {!!keycloak?.authenticated && (
        <Nav pullRight>
          <Nav.Item icon={<Icon icon="sign-out" />} onClick={() => Logout()}>
            Logout
          </Nav.Item>
        </Nav>
        )}
      </Navbar.Body>
    </Navbar>
    </div>
  );
};

export default Header;