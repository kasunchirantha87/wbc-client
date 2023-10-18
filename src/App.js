import React from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'rsuite/dist/styles/rsuite-default.css';
import WelcomePage from "./component/welcome/Welcome";
import Home from "./component/home/Home";
import PrivateRoute from "./helpers/PrivateRoute";
import Book from "./component/book/Book";
import Lending from "./component/lending/Lending";

import './App.css'

function App() {

 return (
   <div>
     <ReactKeycloakProvider authClient={keycloak}>
       <BrowserRouter>
         <Routes>
           <Route exact path="/" element={<WelcomePage />} />
            <Route
             path="/home"
             element={
               <PrivateRoute>
                 <Home />
               </PrivateRoute>
             }
           />
           <Route
             path="/book"
             element={
               <PrivateRoute>
                 <Book />
               </PrivateRoute>
             }
           />
           <Route
             path="/lending"
             element={
               <PrivateRoute>
                 <Lending />
               </PrivateRoute>
             }
           />
         </Routes>
       </BrowserRouter>
     </ReactKeycloakProvider>
     
   </div>
 );
}

export default App;