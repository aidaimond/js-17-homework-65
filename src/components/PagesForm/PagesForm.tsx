import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from "../../axiosApi";
import {Page} from "../../types";
import {useNavigate} from "react-router-dom";
import Spinner from "../Spinner/Spinner";

interface Props {
  pageName: string[] | null;
}

const PagesForm: React.FC<Props> = ({pageName}) => {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState<string>('');
  const [pagesForm, setPagesForm] = useState<Page>({
    content: '',
    title: '',
  });

  const selectFormChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPages(e.target.value);
  };

  const formChanged = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setPagesForm(prev => ({...prev, [name]: value}));
  };

  const fetchPages = useCallback(async () => {
    setLoading(true);
    try {
      const pagesResponse = await axiosApi.get('/pages/'+ pages + '.json');
      const response = pagesResponse.data;
      if (response!== null) {
        setPagesForm(response);
      }
    } finally {
      setLoading(false);
    }
  }, [pages]);

  useEffect(() => {
    if (pages) {
      fetchPages().catch(console.error);
    }
  }, [pages, fetchPages]);

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await axiosApi.put('/pages/' + pages + '.json', pagesForm);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    loading? <Spinner/> :
      <form onSubmit={onFormSubmit}>
        <h1>Edit pages</h1>
        <div className="form-group">
          <label htmlFor="name">Select page</label>
          <select id="name" name="name" className="form-control" value={pages} onChange={selectFormChanged}
          >
            <option disabled value=''>
              Select page category
            </option>
            {pageName && pageName.map(name => (
              <option value={name} key={name}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title" type="text" name="title"
            className="form-control"
            onChange={formChanged}
            value={pagesForm.title}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Description</label>
          <textarea
            id="content" name="content"
            className="form-control"
            onChange={formChanged}
            value={pagesForm.content}
          />
        </div>
        <button
          disabled={pagesForm.name  === '' || pagesForm.title  === '' || pagesForm.content  === ''}
          type="submit" className="btn btn-primary my-4"
        >
          Save
        </button>
      </form>
  );
};

export default PagesForm;