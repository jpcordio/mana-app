import { useState } from "react";

function Articles(props) {

  const [moreInfo, setMoreInfo] = useState(false);

  function handleShowLess(e) {
    e.preventDefault();
    setMoreInfo(false);
  }

  function handleShowMore(e) {
    e.preventDefault();
    setMoreInfo(true);
  }

  if(moreInfo){

    return (
      <div>
        
        <h4>{props.title}</h4> 
        <button onClick={handleShowLess}>Show Less</button>
        <ul>
          <li>
            {props.body}
          </li>
        </ul>     
      </div>
    );

  }else{

    return (
      <div>        
        <h4>{props.title}</h4>
        <button onClick={handleShowMore}>Show More</button> 
        
      </div>
    );
  }

    
}
  
export default Articles;