import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function FindPatient() {
  const [name, setName] = useState("");
  const [searched, setSearched] = useState(false);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const buttonHandler = async () => {
    try {
      if (!name.trim()) {
        toast.warning("Please enter a name");
        return;
      }

      setLoading(true);
      setRecords([]);
      setSearched(false);

      const url =
        "http://localhost:9002/api/patient/getPatientByName/" + name.trim();

      const res = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setRecords(res.data.patients || []);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setRecords([]);
      } else {
        toast.error(err.response?.data || err.message);
      }
    } finally {
      setSearched(true);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Find Patient by Name</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          buttonHandler();
        }}
      >
        <div className="mb-3">
          <label className="form-label">
            Patient Name
            <span className="text-danger"> *</span>
          </label>
          <input
            className="form-control"
            type="text"
            value={name}
            placeholder="Enter patient name"
            onChange={nameHandler}
            pattern="[A-Za-z\s]+"
            title="Only letters allowed"
            required
          />
        </div>

        <button
          className="btn btn-primary w-100"
          type="submit"
          disabled={!name.trim() || loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Searching...
            </>
          ) : (
            "Find"
          )}
        </button>
      </form>
      {searched && records.length === 0 && name && (
        <p className="mt-3 text-danger">No records found</p>
      )}
      {records.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered table-hover table-striped mt-3">
            <thead className="table-dark">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Phone Number</th>
                <th>Medical History</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((e) => {
                return (
                  <tr key={e.patientId}>
                    <td>{e.patientId}</td>
                    <td>{e.patientName}</td>
                    <td>{new Date(e.patientDOB).toLocaleDateString()}</td>
                    <td>{e.patientGender}</td>
                    <td>{e.patientPhoneNumber}</td>
                    <td>{e.patientMedicalHistory}</td>
                    <td>{e.patientStatus}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
