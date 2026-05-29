import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router";
export default function DisplayCompilanceReport() {

  let [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9002/api/fetchAllComplianceReports")
      .then((res) => {
        setReports(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Compliance Report </h2>

      
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
            {
                reports.map((r) => {
                    return(
                        <tr key={r.reportId}>
                            <td>{r.reportId}</td>
                            <td>{r.reportScope}</td>
                            <td>{r.reportMetrics}</td>
                            <td>{r.reportGeneratedDate}</td>
                            <td>
                                <Link to={"/compilance_report/update/"+r.reportId}>Edit</Link>
                            </td>
                            <td>
                                <Link to={"/compilance_report/delete/"+r.reportId}>Delete</Link>
                            </td>
                        </tr>
                    )
                })
            }
          </tbody>
        </table>

    </div>
  );
}