import axios from 'axios';
import { useState } from 'react';
import {toast} from 'react-toastify';

export default function AddInvoice() {

    const [patientId, setPatientId] = useState("");
    const [amount, setAmount] = useState("");
    const [invoiceDate, setInvoiceDate] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [paymentMode, setPaymentMode] = useState("");
    const [adjustmentAmount, setAdjustmentAmount] = useState("");
    const [refundStatus, setRefundStatus] = useState("");

    const buttonHandler = () => {

        const url = "http://localhost:9002/api/invoice/addInvoice";

        
        if (!patientId || !amount || !invoiceDate || !paymentStatus || !paymentMode || 
            !adjustmentAmount || !refundStatus) 
        {
            toast.warning("Please fill all fields");
            return;
        }

        
        if (amount <= 0) {
            toast.info("Amount must be greater than 0");
            return;
        }

        if (adjustmentAmount < 0) {
            toast.info("Adjustment amount cannot be negative");
            return;
        }

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

        axios.post(url, data,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                })
            .then((res) => {
                toast.success("Invoice added successfully");
                setPatientId("");
                setAmount("");
                setInvoiceDate("");
                setPaymentStatus("");
                setPaymentMode("");
                setAdjustmentAmount("");
                setRefundStatus("");
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    return (
        <div className='container mt-4'>
            <h3 className='mb-4'>Add Invoice</h3>

            <div className='mb-3'>
                <label className='form-label'>Patient ID</label>
                <input
                type="number"
                className='form-control'
                placeholder="Enter patient ID"
                value={patientId}
                onChange={e => setPatientId(e.target.value ? Number(e.target.value) : "")}
                />
            </div>

            <div className='mb-3'>
                <label className='form-label'>Amount</label>
                <input
                className="form-control"
                type="number"
                min='0'
                step="0.01"
                placeholder='Enter amount'
                value={amount}
                onChange={e => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                />
            </div>

            <div className='mb-3'>
                <label className='form-label'>Invoice Date</label>
                <input
                className="form-control"
                type="date"
                value={invoiceDate}
                onChange={e => setInvoiceDate(e.target.value)}
                />
            </div>

            <div className='mb-3'>
                <label className='form-label'>Payment Status</label>
                <select
                className="form-select"
                value={paymentStatus}
                onChange={e => setPaymentStatus(e.target.value)}
                >
                <option value="">--Select--</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                </select>
            </div>

            <div className='mb-3'>
                <label className='form-label'>Payment Mode</label>
                <select
                className="form-select"
                value={paymentMode}
                onChange={e => setPaymentMode(e.target.value)}
                >
                <option value="">--Select--</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="UPI">UPI</option>
                </select>
            </div>

            <div className='mb-3'>
                <label className='form-label'>Adjustment Amount</label>
                <input
                className="form-control"
                type="number"
                min='0'
                step="0.01"
                placeholder='Enter adjusted amount'
                value={adjustmentAmount}
                onChange={e => setAdjustmentAmount(e.target.value === "" ? "" : Number(e.target.value))}
                />
            </div>

            
            <div className='mb-3'>
                <label className='form-label'>Refund Status</label>
                <select
                className="form-select"
                value={refundStatus}
                onChange={e => setRefundStatus(e.target.value)}
                >
                <option value="">--Select--</option>
                <option value="None">None</option>
                <option value="Processed">Processed</option>
                <option value="Pending">Pending</option>
                </select>
            </div>

            <button className='btn btn-primary w-100' onClick={buttonHandler}>
                Add Invoice
            </button>
        </div>
    );
}