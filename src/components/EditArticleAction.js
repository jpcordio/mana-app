import { useState, useEffect } from "react";
import { fetchArticleId, updateArticle } from "../services/Articles.service";
import { isCompany, isLogged } from "../services/Authentication.service";
import { Link } from "react-router-dom";
import { Spinner, Container, Row, Col, Form, Button  } from "react-bootstrap";

function EditArticleAction() { 
    ////////////////////////////////////    Variables   ////////////////////////////////////
    const [articleId, setArticleId] = useState(''); 
    const [userId, setUserId] = useState(''); 
    const [title, setTitle] = useState(''); 
    const [body, setBody] = useState(''); 
    //const [imageUrl, setImageUrl] = useState(''); // URL of the image when I get it implemented
    const [loading, setLoading] = useState(true); // loading control

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
          
            // Update the the userId e articleId
            setArticleId(articleIdParam);
            setUserId(userIdParam);            

            // Função para buscar o artigo
            async function fetchAndSetArticleId() {
                try {
                    const articleData = await fetchArticleId(articleIdParam); 
                    const article = articleData.data;

                    if (article) {
                        setTitle(article.title); 
                        setBody(article.body); 
                    }
                } catch (error) {
                    if (error.response) {
                        console.error("Error on the request:", error.response.data);
                    } else {
                        console.error("Unknown Error:", error.message);
                    }
                    alert('Error, not possible to load the articles.');
                } finally {
                    setLoading(false);
                }
            }
            fetchAndSetArticleId(); 
        }            
    }, [userId]);

    ///////////////////////////////////// Handles the Update of a Article ////////////////////////////////////
    async function handleUpdateArticle(e) {
        e.preventDefault();

        try {
            await updateArticle(articleId, title, body); //add imageUrl when implemented
            window.location.href = "/posts?response_edit=true";
        } catch (error) {
            if (error.response) {
                console.error("Erro on the request:", error.response.data);
            } else {
                console.error("Unkown Error:", error.message);
            }
            window.location.href = "/posts?response_edit=false";
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
                <Container>
                <Row className="justify-content-center">
                  <Col md={8}>
                    <h2 className="text-center mb-4">Update Article</h2>
                    <Form onSubmit={handleUpdateArticle}>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={handleTitle}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="body">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                value={body}
                                onChange={handleBody}
                                required
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-between mt-3">
                            <Button type="submit" className="btn btn-primary">
                                Save
                            </Button>
                            <Link to="/posts" className="btn btn-warning">
                                Back
                            </Link>
                        </div>
                    </Form>
                  </Col>
                </Row>
              </Container>
        )}
        </div>
    );
}

export default EditArticleAction;
