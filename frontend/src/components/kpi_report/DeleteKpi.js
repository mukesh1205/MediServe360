import { useParams } from "react-router";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function DeleteKPi() {

  const { id } = useParams();
//   const navigate = useNavigate();

  useEffect(() => {
    axios.delete(`http://localhost:9002/api/deleteKPIReport/${id}`)
      .then((response) => {
        alert("KPI Deleted ");
        //navigate("/kpi_report");
      })
      .catch((error) => {
        console.error(error);
        alert("Delete Failed ");
      });
  }, [id]);

  return (
    <div>
      <h2>Deleting KPI Report...</h2>
      <p>ID: {id}</p>
    </div>
  );
}