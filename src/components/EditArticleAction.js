import { useState, useEffect } from "react";
import { fetchArticleId, updateArticle } from "../services/Articles.service";
import { isCompany, isLogged } from "../services/Authentication.service";
import { Link } from "react-router-dom";

function EditArticleAction() { 
    ////////////////////////////////////    Variables   ////////////////////////////////////
    const [articleId, setArticleId] = useState(''); // ID do artigo
    const [userId, setUserId] = useState(''); // ID do usuário
    const [title, setTitle] = useState(''); // Título do artigo
    const [body, setBody] = useState(''); // Corpo do artigo
    const [imageUrl, setImageUrl] = useState(''); // URL da imagem
    const [loading, setLoading] = useState(true); // Controle de loading

    ////////////////////////////////////    Handle fields    ////////////////////////////////////
    function handleTitle(e) {
        setTitle(e.target.value);
    }

    function handleBody(e) {
        setBody(e.target.value);
    }

    ///////////////////////////////////// Fetch the article data and validation ////////////////////////////////////
    useEffect(() => {
        if (!isLogged() || !isCompany()) {
            window.location.href = "/login";
        } else {
            const params = new URLSearchParams(window.location.search);
            const articleIdParam = params.get('articleId');            
            const userIdParam = params.get('userId');
          
            // Atualizando o estado do userId e articleId
            setArticleId(articleIdParam);
            setUserId(userIdParam);

            // Função para buscar o artigo
            async function fetchAndSetArticleId() {
                try {
                    const articleData = await fetchArticleId(articleIdParam); // Busca o artigo por ID
                    const article = articleData.data;

                    if (article) {
                        setTitle(article.title); // Atualiza o título no estado
                        setBody(article.body); // Atualiza o corpo no estado
                    }
                } catch (error) {
                    if (error.response) {
                        console.error("Erro na requisição:", error.response.data);
                    } else {
                        console.error("Erro desconhecido:", error.message);
                    }
                    alert('Erro, não foi possível obter o artigo.');
                } finally {
                    setLoading(false); // Finaliza o carregamento
                }
            }

            fetchAndSetArticleId(); // Executa a função ao montar o componente
        }            
    }, []);

    ///////////////////////////////////// Handles the Update of a Article ////////////////////////////////////
    async function handleUpdateArticle(e) {
        e.preventDefault();

        try {
            await updateArticle(articleId, title, body, imageUrl);
            alert("Post editado com sucesso.");
            window.location.href = "/posts";
        } catch (error) {
            if (error.response) {
                console.error("Erro na requisição:", error.response.data);
            } else {
                console.error("Erro desconhecido:", error.message);
            }
            alert('Erro ao editar o post.');
        }
    }

    return (
        <div className="">
            {loading ? (
                <p>Loading...</p> // Exibe a mensagem de carregamento enquanto os dados estão sendo obtidos
            ) : (
                <div>
                    <label htmlFor="title">Title</label><br></br>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        value={title} 
                        onChange={handleTitle} 
                        required 
                    /> <br></br>
                    
                    <label htmlFor="body">Content</label><br></br>
                    <textarea 
                        id="body" 
                        name="body" 
                        rows="4" 
                        cols="50" 
                        value={body} 
                        onChange={handleBody} 
                        required 
                    /> <br></br>
                    
                    <button onClick={handleUpdateArticle}>Save</button>
                    <Link to="/posts">
                        <button>Back</button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default EditArticleAction;
