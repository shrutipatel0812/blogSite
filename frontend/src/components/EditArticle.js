import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function EditArticle(props) {
  const [title, setTitle] = useState("");
  const [authorname, setAuthorname] = useState("");
  const [article, setArticle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`/articles/${props.match.params.id}`)
      .then((res) => [
        setTitle(res.data.title),
        setArticle(res.data.article),
        setAuthorname(res.data.authorname),
      ])
      .catch((err) => console.log(err));
  }, []);

  async function submit(e) {
    e.preventDefault();
    const data = {
      title,
      authorname,
      article,
    };

    setTitle("");
    setArticle("");
    setAuthorname("");

    await axios
      .put(`/articles/update/${props.match.params.id}`, data)
      .then((res) => setMessage(res.data))
      .catch((err) => console.log(err));
    console.log(data);
  }

  return (
    <div>
      <Form className="container" onSubmit={submit} encType>
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
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default EditArticle;
