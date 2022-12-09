import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from "../../axiosApi";
import {Page} from "../../types";
import {useParams} from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";

const RenderAll = () => {
  const [pages, setPages] = useState<Page | null>(null);
  const [loading, setLoading] = useState(false);
  const {pagesName} = useParams();

  const fetchPages = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const pagesResponse = await axiosApi.get('/pages/' + id + '.json');
      if (pagesResponse.data !== null) {
        setPages(pagesResponse.data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let id = 'home';
    if (pagesName) {
      id = pagesName;
    }
    fetchPages(id).catch(console.error);
  }, [pagesName, fetchPages]);

  return (
    loading ? <Spinner/> :
      <div className="m-4">
        <h4>{pages?.title}</h4>
        <p>{pages?.content}</p>
      </div>
  );
};

export default RenderAll;