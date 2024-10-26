import { useState, useEffect } from "react";
import { fetchArticleId, updateArticle } from "../services/Articles.service";
import { isCompany, isLogged } from "../services/Authentication.service";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";

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
            alert("Posted edited successfully.");
            window.location.href = "/posts";
        } catch (error) {
            if (error.response) {
                console.error("Erro on the request:", error.response.data);
            } else {
                console.error("Unkown Error:", error.message);
            }
            alert('Error when editing the post.');
        }
    }

    return (
        <div className="container mt-5">
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                </div>
            ) : (
            <div>
                <h2 className="text-center mb-4">Update Article</h2>
                <form>
                    <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        className="form-control" 
                        value={title} 
                        onChange={handleTitle} 
                        required 
                    />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="body" className="form-label">Content</label>
                    <textarea 
                        id="body" 
                        name="body" 
                        rows="4" 
                        className="form-control" 
                        value={body} 
                        onChange={handleBody} 
                        required 
                    />
                    </div>

                    <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-primary" onClick={handleUpdateArticle}>
                        Save
                    </button>
                    <Link to="/posts" className="btn btn-warning">
                        Back
                    </Link>
                    </div>
                </form>
            </div>
        )}
        </div>
    );
}

export default EditArticleAction;
