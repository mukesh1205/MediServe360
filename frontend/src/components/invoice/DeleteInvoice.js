import axios from "axios";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';

export default function DeleteInvoice() {

    const { iid } = useParams();   
    const navigate = useNavigate();

    useEffect(() => {
        if (!window.confirm("Are you sure you want to delete this invoice?")) {
                navigate("/invoice");
                return;
        }
        const url = "http://localhost:9002/api/deleteInvoice/" + iid;

        axios.delete(url)
            .then((res) => {
                toast.success("Invoice deleted successfully");
                navigate("/invoice");
            })
            .catch((err) => {
                toast.error(err.message);
            });

    }, [iid, navigate]);
    return (
        <div>
            <h3>Deleting Invoice...</h3>
        </div>
    );
}