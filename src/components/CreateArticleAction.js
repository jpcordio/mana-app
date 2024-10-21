import { useState, useEffect } from "react";
import { createArticle } from "../services/Articles.service";
import { isCompany, isLogged } from "../services/Authentication.service";
import { Link } from "react-router-dom";

function CreateArticleAction() { 

    ///////////////////////////////////// Check Validation ////////////////////////////////////
    useEffect(()=>{
        if(!isLogged() || !isCompany()){
        window.location.href = "/login";
        }
    });

    ////////////////////////////////////    Variables   ////////////////////////////////////
    var [title, setTitle] = useState('');
    var [body, setBody] = useState('');
    var [imageUrl, setImageUrl] = useState('');

    ////////////////////////////////////    handle fields    ////////////////////////////////////
    function handleTitle(e) {
        e.preventDefault();
        setTitle(e.target.value);
    };

    function handleBody(e) {
        e.preventDefault();
        setBody(e.target.value);
    }

    function handleImageUrl(e) {
        e.preventDefault();
        setImageUrl(e.target.value);
    }

    ///////////////////////////////////// Handles the Registration of a Article ////////////////////////////////////
    async function handleCreateArticle(e){
        e.preventDefault();

        try {

            await createArticle(title, body, imageUrl);

            alert("Post created successfully.")

            window.location.href="/posts"

        } catch (error) {
            if (error.response) {
                console.error("Erro on the request:", error.response.data);
            } else {
                console.error("Unknown Erro:", error.message);
            }

            alert('Erro while registering the new article.');
        }
    }

    return (
        <div className="">
    
          <label htmlFor="title">Title</label><br></br>
          <input type='text' id="title" name="title" value={title} onChange={handleTitle} required /> <br></br>
          
          <label htmlFor="body">Content</label><br></br>
          <textarea id="body" name="body" rows="4" cols="50" value={body} onChange={handleBody} /> <br></br>
              
          <button onClick={handleCreateArticle}>Create</button>
          <Link to="/posts">
            <button>Back</button>
          </Link>
          <br />     
          
        </div>
      );
}

export default CreateArticleAction;