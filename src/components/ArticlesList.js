import { fetchArticles } from "../services/Articles.service";
import Articles from "./Articles";
import { useState, useEffect } from "react";

function ArticlesList() {

    const [articles, setArticles] = useState([]); // Estado para os artigos

    useEffect(() => {
        async function fetchAndSetArticles() {
            try {
                const articlesData = await fetchArticles(); // Chama a função que busca os artigos
                setArticles(articlesData); // Atualiza o estado com os dados obtidos
            } catch (error) {
                if (error.response) {
                    // Erro na resposta da API
                    console.error("Erro na requisição:", error.response.data);
                } else {
                    // Erro desconhecido
                    console.error("Erro desconhecido:", error.message);
                }

                alert('Erro, não foi possível obter a lista de artigos.');
            }
        }

        fetchAndSetArticles(); // Executa a função ao montar o componente
    }, []);


    // function handleSearchQuery(e) {
    //     e.preventDefault();
    //     setQuery(e.target.value);
    // }

    return (
        <div className="home">
            {/* <input value={query} onChange={handleSearchQuery} placeholder="Search..." /> */}
            
            <ul>
                {
                    articles.map((article, index) => (
                        <li key={index}> 
                            <Articles title={article.title} body={article.body}/>
                            <hr />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
  
export default ArticlesList;