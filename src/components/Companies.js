import { useState, useEffect } from "react";
import { isFollowing, setFollow, setUnfollow } from "../services/Connection.service";

function Companies(props) {
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    // Verificar se a empresa está sendo seguida ao montar o componente
    async function checkIfFollowed() {
      const result = await isFollowing(props.id);
      setIsFollowed(result);
    }

    checkIfFollowed();
  }, [props.id]);

  // Função para seguir a empresa
  async function handleFollow() {
    await setFollow(props.id);
    setIsFollowed(true); // Atualizar estado
    window.location.reload(); // Recarrega a página
  }

  // Função para deixar de seguir a empresa
  async function handleUnfollow() {
    await setUnfollow(props.id);
    setIsFollowed(false); // Atualizar estado
    window.location.reload(); // Recarrega a página
  }

  return (
    <div>
      <h4>
        {props.name + " (" + props.id + ") " + props.email}
        {isFollowed ? (
          <button onClick={handleUnfollow}>Unfollow</button>
        ) : (
          <button onClick={handleFollow}>Follow</button>
        )}
      </h4>
    </div>
  );
}

export default Companies;