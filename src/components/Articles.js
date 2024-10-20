import { useState } from "react";

function Articles(props) {

  const [moreInfo, setMoreInfo] = useState(true);

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
        
        <h4>{props.title} <button onClick={handleShowLess}>Show Less</button></h4> 
        
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
        <h4>{props.title} <button onClick={handleShowMore}>Show More</button> </h4>
      </div>
    );
  }

    
}
  
export default Articles;