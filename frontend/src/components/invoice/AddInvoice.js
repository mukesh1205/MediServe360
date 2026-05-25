import axios from 'axios';
import { useState } from 'react';

export default function AddInvoice() {

    const [patientId, setPatientId] = useState(0);
    const [amount, setAmount] = useState(0);
    const [invoiceDate, setInvoiceDate] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [paymentMode, setPaymentMode] = useState("");
    const [adjustmentAmount, setAdjustmentAmount] = useState(0);
    const [refundStatus, setRefundStatus] = useState("");

    const buttonHandler = () => {

        const url = "http://localhost:9002/api/addInvoice";

        const data = {
            invoice: {
                patient: {
                    patientId: patientId
                },
                amount: Number(amount),
                invoiceDate: invoiceDate,
                paymentStatus: paymentStatus,
                paymentMode: paymentMode,
                adjustmentAmount: Number(adjustmentAmount),
                refundStatus: refundStatus
            }
        };

        axios.post(url, data)
            .then((res) => {
                alert("Invoice added successfully");
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err.response?.data || err);
                alert("Error adding invoice");
            });
    };

    return (
        <div>
            <h3>Add Invoice</h3>

            <label>Patient ID</label>
            <input
                type="number"
                onChange={e => setPatientId(Number(e.target.value))}
            />
            <br />

            <label>Amount</label>
            <input
                type="number"
                step="0.01"
                onChange={e => setAmount(e.target.value)}
            />
            <br />

            <label>Invoice Date</label>
            <input
                type="date"
                onChange={e => setInvoiceDate(e.target.value)}
            />
            <br />

            <label>Payment Status</label>
            <select onChange={e => setPaymentStatus(e.target.value)}>
                <option value="">--Select--</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
            </select>
            <br />

            <label>Payment Mode</label>
            <select onChange={e => setPaymentMode(e.target.value)}>
                <option value="">--Select--</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="UPI">UPI</option>
            </select>
            <br />

            <label>Adjustment Amount</label>
            <input
                type="number"
                step="0.01"
                onChange={e => setAdjustmentAmount(e.target.value)}
            />
            <br />

            <label>Refund Status</label>
            <select onChange={e => setRefundStatus(e.target.value)}>
                <option value="">--Select--</option>
                <option value="None">None</option>
                <option value="Processed">Processed</option>
                <option value="Pending">Pending</option>
            </select>
            <br />

            <button onClick={buttonHandler}>Add Invoice</button>
        </div>
    );
}