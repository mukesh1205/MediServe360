import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function FindDoctor() {
    const [id, setId] = useState("");
    const [searched, setSearched] = useState(false);
    const [doctor, setDoctor] = useState(null);

    const idHandler = (e) => {
        setId(e.target.value);
    };

    const buttonHandler = async () => {
        try {
            if (!id.trim()) {
                toast.warning("Please enter a Doctor ID");
                return;
            }
            setDoctor(null);
            setSearched(false);
            const url = "http://localhost:9002/api/doctor/get/" + id;
            const res = await axios.get(url, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            setDoctor(res.data);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setDoctor(null);
            } else {
                toast.error(err.message);
            }
        }
        setSearched(true);
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Find Doctor by ID</h3>
            <div className="mb-3">
                <label className="form-label">Enter Doctor ID</label>
                <input
                    className="form-control"
                    type="text"
                    value={id}
                    onChange={idHandler}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            buttonHandler();
                        }
                    }}
                />
            </div>

            <button
                className="btn btn-primary w-100"
                onClick={buttonHandler}
                disabled={!id.trim()}
            >
                Find
            </button>

            {searched && !doctor && id && (
                <p className="mt-3 text-danger">No records found</p>
            )}

            {doctor && (
                <div className="table-responsive mt-3">
                    <table className="table table-bordered table-hover table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Availability</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{doctor.id}</td>
                                <td>{doctor.name}</td>
                                <td>{doctor.department}</td>
                                <td>{doctor.availabilitySchedule}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
