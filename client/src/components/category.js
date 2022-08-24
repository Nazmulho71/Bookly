import React, { useState, useEffect } from "react";
import axios from "axios";

function Category() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState();
  const [error, setError] = useState();
  const [updateError, setUpdateError] = useState();
  const [input, setInput] = useState(false);
  const [name, setName] = useState("");
  const [updateName, setUpdateName] = useState("");

  let baseUrl = "http://localhost:8080/api/categories";
  let headers = {
    "X-Auth-Token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA0MjNiNmRlMmJkOWMwMTk0OGIxZTYiLCJhZG1pbiI6dHJ1ZSwibW9kZXJhdG9yIjp0cnVlLCJpYXQiOjE2NjEyMTU3MjV9.k1-Eme0m431T2oe9d2AazDQ02OhMUGe5VlpypqmtVL4",
    "Content-Type": "application/json",
  };

  const handleCreate = (e) => {
    e.preventDefault();
    createCategory(name);
    setName("");
  };

  const createCategory = (name) => {
    axios
      .post(baseUrl, { name: name }, { headers: headers })
      .then((res) => setCategories([res.data, ...categories]))
      .catch((err) => setError(err.response.data));
  };

  const updateCategory = (id) => {
    axios
      .put(`${baseUrl}/${id}`, { name: updateName }, { headers: headers })
      // .then((res) => setUpdateName(res.data.name))
      .then((res) => console.log(res))
      .catch((err) => setUpdateError(err.response.data));
  };

  const deleteCategory = (id) => {
    axios.delete(`${baseUrl}/${id}`, { headers: headers });
    setCategories(
      categories.filter((category) => {
        return category._id !== id;
      })
    );
  };

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <div className="category">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter category name"
          aria-label="Enter category name"
          aria-describedby="basic-addon2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={(e) => handleCreate(e)}
          >
            Create
          </button>
        </div>
      </div>

      <div className="text-start text-danger mb-3">{error && error}</div>

      <div className="overflow-auto" style={{ maxHeight: 500 }}>
        {categories?.length ? (
          categories.map((category, i) => (
            <div
              className="d-flex align-items-center justify-content-between rounded bg-light p-3 mb-3"
              key={i}
            >
              {input ? (
                <div className="d-flex align-items-center">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Category"
                    aria-label="Category"
                    aria-describedby="basic-addon1"
                    value={updateName}
                    onChange={(e) => setUpdateName(e.target.value)}
                  ></input>
                  <span className="ms-3 text-nowrap">
                    {updateError && updateError}
                  </span>
                </div>
              ) : (
                <span>{category.name}</span>
              )}
              <div>
                {input ? (
                  <button
                    className="btn btn-outline-success me-3"
                    type="button"
                    onClick={() => {
                      updateCategory(category._id);
                      setInput(false);
                    }}
                  >
                    <i className="fa-regular fa-circle-check"></i>
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-success me-3"
                    type="button"
                    onClick={() => setInput(true)}
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>
                )}
                <button
                  className="btn btn-outline-danger"
                  type="button"
                  onClick={() => deleteCategory(category._id)}
                >
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>{loading ? "Loading..." : "No category found."}</p>
        )}
      </div>
    </div>
  );
}

export default Category;
