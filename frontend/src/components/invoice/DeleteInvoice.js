import axios from "axios";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DeleteInvoice() {

    const { iid } = useParams();   
    const navigate = useNavigate();

    useEffect(() => {
        const url = "http://localhost:9002/api/invoice/deleteInvoice/" + iid;

        axios.delete(url,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                })
            .then((res) => {
                alert("Invoice deleted successfully");
                navigate("/invoice");
            })
            .catch((err) => {
                console.error(err);
            });

    }, [iid, navigate]);
    return (
        <div>
            <h3>Deleting Invoice...</h3>
        </div>
    );
}