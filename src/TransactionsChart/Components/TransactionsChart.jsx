import React, { useEffect, useState } from 'react'
import Chart from 'chart.js/auto';
import { Title } from '../../SharedModule/Components/Title/Title';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

export default function TransactionsChart() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [selectedCustomerTransactions, setSelectedCustomerTransactions] = useState([]);

  async function getAllData() {
    try {
      const transactions= await axios.get('https://mocki.io/v1/e45d80cf-fcf1-47be-9400-85bc39c37c52');
      setAllTransactions(transactions?.data?.transactions)
      setAllCustomers(transactions?.data?.customers)
    } catch (error) {
      toast.error('Somthing went wrong!')
    }
  }

  function customerTransactions(customer){
    const transactions=allTransactions.filter((transaction)=>
    allCustomers[transaction.customer_id-1].name==customer
  )
    setSelectedCustomerTransactions(transactions)
  }


  useEffect(() => {
    getAllData();
  }, []);
  return (
    

    <div className="w-100 vh-100">

      <Title title={"All Customers Charts"} />

      <div className="row mb-5 mt-3 ms-4 justify-content-center gx-0">
        
        <div className="col-md-4 col-sm-4 me-1 mt-1">
              <select className="form-select py-2" 
              onChange={(e)=>customerTransactions(e.target.value)}
              >
                <option value="">Select Customer Name...</option>
                {allCustomers.map((customer)=>
                <option>{customer.name}</option>
                )}
              </select>
            </div>

      </div>

      <div className="chart mx-auto" style={{height:'65%', width:'70%'}}>
      <Bar data={{
        labels: selectedCustomerTransactions.map((data)=>data.date),
        datasets:[
          {
            label:'Amount',
            data:selectedCustomerTransactions.map((data)=>data.amount),
          }
        ]
      }}/>
      </div>

    </div>
  )
}
