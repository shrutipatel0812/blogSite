import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function ArticleList({ posts }) {
  const [article, setArticle] = useState([]);
  const deleteArticle = (id) => {
    axios.delete(`/articles/delete/${id}`).then((res) => alert(res.data));
    setArticle(article.filter((elem) => elem._id !== id));
  };

  function renderArticles() {
    return posts.map((posts, i) => {
      return (
        <Col>
          {" "}
          <Card
            style={{
              width: "18rem",
            }}
          >
            <Card.Img variant="top" src={`/uploads/${posts.articleImage}`} />
            <Card.Body>
              <Card.Title>{posts.title}</Card.Title>
              <hr />
              <Card.Subtitle className="mb-2 text-muted">
                {posts.authorname}
              </Card.Subtitle>
              <Card.Text>{posts.article}</Card.Text>
              <Link
                to={{
                  pathname: `/moreInfo/${posts._id}`,
                }}
              >
                MoreInfooo
              </Link>
              <br></br>
              <Link
                className="btn btn-warning"
                to={{
                  pathname: `/update/${posts._id}`,
                }}
              >
                Edit
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => deleteArticle(posts._id)}
              >
                {" "}
                Delete
              </button>
            </Card.Body>
          </Card>
        </Col>
      );
    });
  }

  return (
    <div>
      <Container>
        <Row>{renderArticles()}</Row>
      </Container>
    </div>
  );
}

export default ArticleList;
