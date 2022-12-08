import React from 'react';
import NavBar from "./components/NavBar/NavBar";
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home";
import PagesForm from "./components/PagesForm/PagesForm";

function App() {
  return (<>
      <header>
        <NavBar/>
      </header>
      <main className="container-fluid">
        <Routes>
          <Route path={'/'} element={(<Home/>)}/>
          <Route path={'/pages/admin'} element={(<PagesForm/>)}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
