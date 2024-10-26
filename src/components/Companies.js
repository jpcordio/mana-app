import { useState, useEffect } from "react";
import { isFollowing, setFollow, setUnfollow } from "../services/Connection.service";
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

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
    <div className="mb-3">
    <h4 className="d-flex justify-content-between align-items-center">
      <OverlayTrigger
        placement="top" 
        overlay={
          <Tooltip id={`tooltip-${props.id}`}>
            Show Profile
          </Tooltip>
        }
      >
        <a href={`http://localhost:3001/profile?id=${props.id}&name=${props.name}`} className="text-decoration-none text-dark">
          {props.name}
        </a>
      </OverlayTrigger>
      <span className="text-muted">{props.email}</span>
      {isFollowed ? (
        <Button variant="outline-danger" onClick={handleUnfollow}>
          Unfollow
        </Button>
      ) : (
        <Button variant="outline-primary" onClick={handleFollow}>
          Follow
        </Button>
      )}
    </h4>
  </div>
  );
}

export default Companies;