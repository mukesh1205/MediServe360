import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function DisplayComplianceReport() {

  const [reports, setReports] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:9002/api/compliance-reports", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((res) => {
      console.log("✅ Data:", res.data);
      setReports(res.data);
    })
    .catch((err) => {
      console.log("❌ Error:", err.response?.data || err.message);
      alert(err.response?.data || err.message);
    });

  }, []);

  return (
    <div>
      <h2>Compliance Reports</h2>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Scope</th>
            <th>Metrics</th>
            <th>Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {reports.length === 0 ? (
            <tr>
              <td colSpan="6">No Data Found</td>
            </tr>
          ) : (
            reports.map((r) => (
              <tr key={r.reportId}>
                <td>{r.reportId}</td>
                <td>{r.reportScope}</td>
                <td>{r.reportMetrics}</td>
                <td>{r.reportGeneratedDate}</td>
                <td>
                  <Link to={`/compliance-reports/update/${r.reportId}`}>
                    Edit
                  </Link>
                </td>
                <td>
                  <Link to={`/compliance-reports/delete/${r.reportId}`}>
                    Delete
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  );
}