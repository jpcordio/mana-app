import { useState, useEffect } from "react";
import { createArticle } from "../services/Articles.service";
import { isCompany, isLogged } from "../services/Authentication.service";
import { Link } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";

function CreateArticleAction() { 

    ///////////////////////////////////// Check Validation ////////////////////////////////////
    useEffect(() => {
        if (!isLogged() || !isCompany()) {
            window.location.href = "/login";
        }
    }, []);

    ////////////////////////////////////    Variables   ////////////////////////////////////
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    ////////////////////////////////////    handle fields    ////////////////////////////////////
    function handleTitle(e) {
        e.preventDefault();
        setTitle(e.target.value);
    }

    function handleBody(e) {
        e.preventDefault();
        setBody(e.target.value);
    }

    function handleImageUrl(e) {
        e.preventDefault();
        setImageUrl(e.target.value);
    }

    ///////////////////////////////////// Handles the Registration of an Article ////////////////////////////////////
    async function handleCreateArticle(e) {
        e.preventDefault();

        try {
            await createArticle(title, body, imageUrl);
            alert("Post created successfully.");
            window.location.href = "/posts";
        } catch (error) {
            if (error.response) {
                console.error("Erro on the request:", error.response.data);
            } else {
                console.error("Unknown Erro:", error.message);
            }
            setErrorMessage('Erro while registering the new article.');
        }
    }

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Create New Article</h1>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleCreateArticle}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="title">Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        id="title" 
                        name="title" 
                        value={title} 
                        onChange={handleTitle} 
                        required 
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="body">Content</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        id="body" 
                        name="body" 
                        rows={4} 
                        value={body} 
                        onChange={handleBody} 
                        required 
                    />
                </Form.Group>
{/* 
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="imageUrl">Image URL</Form.Label>
                    <Form.Control 
                        type="text" 
                        id="imageUrl" 
                        name="imageUrl" 
                        value={imageUrl} 
                        onChange={handleImageUrl} 
                    />
                </Form.Group> */}

                <div className="d-flex justify-content-between">
                    <Button variant="primary" type="submit">Create</Button>
                    <Link to="/posts" className="btn btn-warning">Back</Link>
                </div>
            </Form>
        </Container>
    );
}

export default CreateArticleAction;