import { useParams } from "react-router";
import axios from "axios";
import { useEffect } from "react";

export default function DeleteCompilance() {

  const { id } = useParams();   
  
let url = "http://localhost:9002/api/deleteComplianceReport"
  useEffect(() => {
    axios.delete(url ,{
        data: {
         id: id
        }
          })
    .then((response) => {
      alert(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }, [id]);
        
  return (
    <div>
      <h2>Deleting Compliance Report...</h2>
      <p>ID: {id}</p>
    </div>
  );
}