import { useState } from "react";
import { createArticle } from "../services/Articles.service";

function CreateArticleAction() { 

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

    ///////////////////////////////////// Handles the Registration of a new user ////////////////////////////////////
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

            alert('Erro while registering the new user.');
        }
    }

    return (
        <div className="">
    
          <label for="title">Title</label><br></br>
          <input type='text' id="title" name="title" value={title} onChange={handleTitle} required /> <br></br>
          
          <label for="body">Content</label><br></br>
          <textarea id="body" name="body" rows="4" cols="50" value={body} onChange={handleBody} /> <br></br>
              
          <button onClick={handleCreateArticle}>Create</button>  <br />     
          
        </div>
      );
}

export default CreateArticleAction;