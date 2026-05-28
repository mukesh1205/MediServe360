import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function FindAllNotification() {

    const [data, setData] = useState([]);

    async function fetchNotifications() {
        const url = "http://localhost:9002/notification/fetchallnotifications";

        try {
            const res = await axios.get(url, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            setData(res.data);
        } catch (err) {
            toast.error(err.message);
        }
    }

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <div className="container mt-4">

            <h3 className="mb-4">Display All Notifications</h3>

            {data.length === 0 ? (
                <p>No notifications found</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover table-striped mt-3">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Category</th>
                                <th>Message</th>
                                <th>Status</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((m) => (
                                <tr key={m.notificationID}>
                                    <td>{m.notificationID}</td>
                                    <td>{m.category}</td>
                                    <td>{m.message}</td>
                                    <td>{m.status}</td>

                                    <td className="text-center">
                                        <Link
                                            className="btn btn-danger btn-sm"
                                            to={`/notification/delete/${m.notificationID}`}
                                        >
                                            Delete
                                        </Link>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            )}

        </div>
    );
}