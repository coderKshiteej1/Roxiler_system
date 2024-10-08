import React, { useEffect, useState } from 'react'
import axios from "axios";
import PaginationController from './PaginationController';
import SearchFilters from './SearchFilters';
import NavBar from '../utility/Navbar/NavBar';
import "./index.css"
import Footer from '../footer/Footer';
const TransactionsTable = () => {

  const [transactions, setTransactions] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    page: 1,
    month: "march",
    perPage: 10,
  });

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URI}/transactions/get`, {
          params: filters
        });
        setTransactions(response.data.records);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchData();
  }, [filters]);


  return (
    <div>
      <NavBar></NavBar>

      <div className='Transactions-Table-main boxShadow'>
        <SearchFilters setFilters={setFilters} filters={filters} />
        <div className='Transactions-Table-div'>
          <table id="trasaction_table">
            <thead >
              <tr id="trasaction_table-th">
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Sold</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr id="trasaction_table-td" className={index % 2 == 1 ? "bg" : ""} key={transaction.id || index + 1}>
                  <td >{transaction.id || index + 1}</td>
                  <td>{truncateText(transaction.title, 40)}</td>
                  <td>{truncateText(transaction.description, 160)}</td>
                  <td>{transaction.price.toFixed(1)}</td>
                  <td className='table-category'>{transaction.category}</td>
                  <td>{transaction.sold ? 'Yes' : 'No'}</td>
                  <td>
                    <div className='flex_center_center'>
                    <img height="50px" src={transaction.image} alt={transaction.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <PaginationController setFilters={setFilters} filters={filters} transCount={transactions.length} />
      </div>
        <Footer></Footer>
    </div>
  );
}

export default TransactionsTable