import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteArticle } from "../services/Articles.service";
import { isCompany } from "../services/Authentication.service";

function Articles(props) {
  const [moreInfo, setMoreInfo] = useState(true);

  function handleShowLess(e) {
    e.preventDefault();
    setMoreInfo(false);
  }

  function handleShowMore(e) {
    e.preventDefault();
    setMoreInfo(true);
  }

  ///////////////////////////////////// Handles the Delete Article ////////////////////////////////////
  async function handleDeleteArticle(e) {
    try {
      await deleteArticle(props.id);
      alert("Post deleted successfully.");
      window.location.href = "/posts";
    } catch (error) {
      if (error.response) {
        console.error("Error in request:", error.response.data);
      } else {
        console.error("Unknown error:", error.message);
      }
      alert("Error deleting post.");
    }
  }

  return (
    <div className="col-md-12 mb-3">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          {moreInfo ? (
            <>
              <p className="card-text">{props.body}</p>
              {/* <button onClick={handleShowLess} className="btn btn-outline-secondary">
                Show Less
              </button> */}
            </>
          ) : (
            // <button onClick={handleShowMore} className="btn btn-outline-primary">
            //   Show More
            // </button>
            console.log("commented in case you want to use button to show/hide")
          )}
          {isCompany() && (
            <div className="mt-2">
              <Link to={`/edit-post?articleId=${props.id}&userId=${props.userId}`} className="btn btn-warning btn-sm me-2">
                Edit
              </Link>
              <button onClick={handleDeleteArticle} className="btn btn-danger btn-sm">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Articles;
