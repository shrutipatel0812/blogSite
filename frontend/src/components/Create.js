import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function Create() {
  const [title, setTitle] = useState("");
  const [authorname, setAuthorname] = useState("");
  const [article, setArticle] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");

  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };

  function submit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("authorname", authorname);
    formData.append("article", article);
    formData.append("articleImage", fileName);

    setTitle("");
    setArticle("");
    setAuthorname("");

    axios
      .post("/articles/create", formData)
      .then((res) => setMessage(res.data))
      .catch((err) => console.log(err));
  }

  return (
    <Form className="container" onSubmit={submit} encType="multipart/form.data">
      <Form.Group controlId="exampleForm.ControlInput1">
        <span>{message}</span>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Authour name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Authour name"
          onChange={(e) => {
            setAuthorname(e.target.value);
          }}
          value={authorname}
        />
      </Form.Group>

      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Example textarea</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={article}
          onChange={(e) => setArticle(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Example textarea</Form.Label>
        <Form.File
          id="exampleFormControlFile1"
          filename="articleImage"
          onChange={onChangeFile}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Create;
