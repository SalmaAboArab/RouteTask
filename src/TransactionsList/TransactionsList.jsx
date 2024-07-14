import React, { useEffect, useState } from "react";
import { Title } from "../SharedModule/Components/Title/Title";
import Filter from "../SharedModule/Components/Filter/Filter";
import NoData from "../SharedModule/Components/NoData/NoData";
import { toast } from "react-toastify";
import Loading from "../SharedModule/Components/Loading/Loading";
import { useNavigate} from "react-router-dom";
import axios from "axios";

export default function TransactionsList() {
  const [allData, setAllData] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);


  //data for pagination//

  // const transactionsNumPerPage = 9;
  // const [CurrentPageNum, setCurrentPageNum] = useState(1);
  // const NbPages = Math.ceil(allData?.length / transactionsNumPerPage);
  // const startIndex = (CurrentPageNum - 1) * transactionsNumPerPage;
  // const endIndex = startIndex + transactionsNumPerPage;
  // const DataPerPage = allTransactions?.slice(startIndex, endIndex);

  async function getAllData() {
    try {
      const transactions= await axios.get('https://mocki.io/v1/e45d80cf-fcf1-47be-9400-85bc39c37c52');
      setAllData(transactions?.data);
      setAllTransactions(transactions?.data?.transactions)
      setAllCustomers(transactions?.data?.customers)
    } catch (error) {
      toast.error('Somthing went wrong!')
    }
    setIsLoading(false);
  }

  async function getFilterdData(searchValue,searchBy) {
    if (searchValue) {
      if(searchBy=='Customer Name'){
      const customers = allCustomers.filter((customer) =>
        customer.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      const transactions=allTransactions.filter((transaction)=>
        customers.includes(allData?.customers[transaction.customer_id-1])
      )
      setAllTransactions(transactions)
      setAllCustomers(customers);
    }
    else{
      const transactions=allData?.transactions?.filter((transaction)=>
        transaction.amount==searchValue
      )
      setAllTransactions(transactions)
    }
    } else getAllData();
    setIsLoading(false);
  }


  useEffect(() => {
    getAllData();
  }, []);

  return (
    <>
      <Title title={"All Customers Transactions"} />

      <div className="addGroup w-100  d-flex justify-content-end px-5 py-3">
        <button className="btn btn-dark me-4 px-4" onClick={()=>navigate('charts')}>Go To Customers Charts</button>
      </div>


      <Filter getItems={getFilterdData} />

      <div className="tableContainer w-100">
      <div className="TransactionsList container border text-center mb-3">
       {isLoading ? (
            <Loading/>
        )
        :(
          allCustomers?.length > 0 ? 
          (
            <table className="table">
            <thead>
              <tr className='tableHead border-bottom'>
                <th className='py-4 border-0 thleft thbg' scope="col">#</th>
                <th className='py-4 border-0 thcenter thbg' scope="col"> Customer Name</th>
                <th className='py-4 border-0 thright thbg' scope="col">Amount</th>
                <th className='py-4 border-0 thright thbg' scope="col">Transaction Date</th>
              </tr>
            </thead>
            <tbody>
              {
                    // DataPerPage?.map((transaction, index) => 
                      allTransactions?.map((transaction,index)=>
                          <tr className='' key={transaction.id}>
                          <th className={index%2==0?'bg-white border-0':'bg-light border-0'} scope="row">{transaction.id}</th>
                          <td className={index%2==0?'bg-white border-0':'bg-light border-0'}>{allData?.customers[transaction.customer_id-1]?.name}</td>
                          <td className={index%2==0?'bg-white border-0':'bg-light border-0'}>{transaction.amount}</td>
                          <td className={index%2==0?'bg-white border-0':'bg-light border-0'}>{transaction.date}</td>
                        </tr>
              )}
            </tbody>
          </table>
          ):(<NoData/>) 
              
        ) } 

        {/* pagination */}

        {/* <nav aria-label="Page navigation example" className="d-flex justify-content-center my-4">
              <ul class="pagination mt-3">
                <li class="page-item">
                  <a
                    class="page-link"
                    onClick={()=> CurrentPageNum-1<1?'':setCurrentPageNum(CurrentPageNum-1)}
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>

                {allTransactions?.slice(0, NbPages).map((transaction, index) => (
                  <li class="page-item">
                    <a
                      class="page-link"
                      onClick={() => setCurrentPageNum(index + 1)}
                    >
                      {index + 1}
                    </a>
                  </li>
                ))}

                <li class="page-item">
                  <a
                    class="page-link"
                    onClick={()=> CurrentPageNum+1>NbPages?'':setCurrentPageNum(CurrentPageNum+1)}
                    aria-label="Next"
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav> */}
      </div>
      </div>
    </>
  );
}
