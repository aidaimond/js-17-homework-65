import React, {useCallback, useEffect, useState} from 'react';
import NavBar from "./components/NavBar/NavBar";
import {Route, Routes} from "react-router-dom";
import RenderAll from "./containers/RenderAll/RenderAll";
import PagesForm from "./components/PagesForm/PagesForm";
import axiosApi from "./axiosApi";

function App() {
  const [pageName, setPageName] = useState<string[] | null>(null);

  const fetchPages = useCallback(async () => {
    const pagesResponse = await axiosApi.get('/pages.json');
    if (pagesResponse.data !== null) {
      setPageName(Object.keys(pagesResponse.data));
    }
  }, []);

  useEffect(() => {
    fetchPages().catch(console.error);
  }, [fetchPages]);

  return (<>
      <header>
        <NavBar pageName={pageName}/>
      </header>
      <main className="container-fluid">
        <Routes>
          <Route path={'/'} element={(<RenderAll/>)}/>
          <Route path={'/pages'} element={(<RenderAll/>)}/>
          <Route path={'/pages/admin'} element={(<PagesForm pageName={pageName}/>)}/>
          <Route path={'/pages/:pagesName'} element={(<RenderAll/>)}/>
          <Route path="*" element={(
            <h1>Not found!</h1>
          )}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
