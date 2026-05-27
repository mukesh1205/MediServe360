import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateComplianceReport() {

  let { id } = useParams();
  let navigate = useNavigate();

  let [scope, setScope] = useState("");
  let [metrics, setMetrics] = useState("");
  let [date, setDate] = useState("");

  let scopeHandler = (e) => {
    setScope(e.target.value);
  };

  let metricsHandler = (e) => {
    setMetrics(e.target.value);
  };

  let dateHandler = (e) => {
    setDate(e.target.value);
  };

  // ✅ UPDATE API FIXED
  let updateButtonHandler = () => {

    let url = "http://localhost:9002/api/compliance-reports";

    let data = {
      complianceReport: {
        reportId: id,
        reportScope: scope,
        reportMetrics: metrics,
        reportGeneratedDate: date
      }
    };

    axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((res) => {
      alert("Updated successfully");
      navigate("/compliance-reports/display"); // ✅ FIXED PATH
    })
    .catch((err) => {
      console.log(err.response?.data);
      alert(err.response?.data || err.message);
    });
  };

  // ✅ FETCH API FIXED
  useEffect(() => {

    let url = "http://localhost:9002/api/compliance-reports";

    axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((res) => {

      let reports = res.data;

      let report = reports.find((r) => r.reportId == id);

      if (report) {
        setScope(report.reportScope);
        setMetrics(report.reportMetrics);
        setDate(report.reportGeneratedDate);
      }

    })
    .catch((err) => {
      console.log(err.response?.data);
      alert(err.response?.data || err.message);
    });

  }, [id]);

  return (
    <div>

      <label>Report ID </label>
      <input value={id} readOnly />
      <br />

      <label>Scope </label>
      <input value={scope} onChange={scopeHandler} />
      <br />

      <label>Metrics </label>
      <input value={metrics} onChange={metricsHandler} />
      <br />

      <label>Date </label>
      <input type="date" value={date} onChange={dateHandler} />
      <br />

      <button onClick={updateButtonHandler}>Update</button>

    </div>
  );
}