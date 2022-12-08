import React from 'react';

const PagesForm: React.FC = () => {

  return (
    <form>
      <h1>Edit pages</h1>
      <div className="form-group">
        <label htmlFor="select">Select page</label>
        <select name="select" className="form-control"
        >
          <option disabled value="">
            Select page category
          </option>
          <option value="">
            About
          </option>
          <option value="">
            Contacts
          </option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title" type="text" name="title"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Description</label>
        <textarea
          id="content" name="content"
          className="form-control"
        />
      </div>
      <button
        type="submit" className="btn btn-primary my-4"
      >
        Save
      </button>
    </form>
  );
};

export default PagesForm;