import React, { useState, useEffect } from "react";
import axios from "axios";

function MoreInfo(props) {
  const [title, setTitle] = useState("");
  const [authorname, setAuthorname] = useState("");
  const [article, setArticle] = useState("");

  useEffect(() => {
    axios
      .get(`/articles/${props.match.params.id}`)
      .then((res) => [
        setTitle(res.data.title),
        setArticle(res.data.article),
        setAuthorname(res.data.authorname),
      ])
      .catch((err) => console.log(err));
  }, [props]);

  return (
    <div>
      <h2>{title}</h2>
      <p>{article}</p>
      <p>{authorname}</p>
    </div>
  );
}

export default MoreInfo;
