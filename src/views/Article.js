import ArticlesList from "../components/ArticlesList";

function Article() {
  return (
    <div className="Article">
      
        <h1>Posts</h1>  
        <a href="/create-post">New Post</a> <br />

        <ArticlesList />

    </div>
  );
}

export default Article;