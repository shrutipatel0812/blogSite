import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/layouts/Header";
import Create from "./components/Create";
import MoreInfo from "./components/MoreInfo";
import ArticleList from "./components/ArticleList";
import axios from "axios";
import EditArticle from "./components/EditArticle";

function Router() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/articles")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  });

  return (
    <BrowserRouter>
      <Header></Header>

      <Route exact path="/">
        <ArticleList posts={posts}></ArticleList>
      </Route>
      <Route
        path="/moreInfo/:id"
        render={(props) => <MoreInfo {...props} posts={posts}></MoreInfo>}
      ></Route>
      <Route
        path="/update/:id"
        render={(props) => <EditArticle {...props} posts={posts}></EditArticle>}
      ></Route>
      <Route path="/create">
        <Create></Create>
      </Route>
    </BrowserRouter>
  );
}

export default Router;
