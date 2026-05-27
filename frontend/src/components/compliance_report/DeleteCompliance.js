import axios from 'axios';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function DeleteCompliance() {

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        const deleteReport = async () => {
            try {
                // ✅ FIXED URL
                const url = `http://localhost:9002/api/compliance-reports/deleteComplianceReport/${id}`;

                await axios.delete(url, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                alert("✅ Compliance Report deleted successfully");

                // ✅ Better navigation (go back to display page)
                navigate("/compliance_report/display");

            } catch (error) {
                console.error(error);
                alert(error.response?.data || "Error deleting report");
            }
        };

        deleteReport();

    }, [id, navigate]);

    return (
        <div>
            <h3>Deleting Compliance Report...</h3>
        </div>
    );
}