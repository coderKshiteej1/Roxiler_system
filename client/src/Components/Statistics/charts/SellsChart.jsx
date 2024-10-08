import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import MonthDropDown from '../../TransactionsTable/microComp/MonthDropDown';

const SellsChart = () => {

    const [sellsData, setSellsData] = useState({
        soldItems: 0,
        soldItemsCount: 0,
        unsoldItemsCount: 0
    });
    const [filters, setFilters] = useState({
        month: "march"
    });
    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URI}/transactions/statistics/sells/get`, {
                params: filters
            });
            setSellsData(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filters]);
    return (
        <div className='Statistics-container boxShadow'>
            <div className='flex_space_center'>
                <h2>Sells Chart -  <span style={{ textTransform: "capitalize" }}>{filters.month}</span></h2>
                <MonthDropDown setFilters={setFilters} filters={filters} />
            </div>

            <div class="margin_auto chart sellsDiv flex_center_center"  >
                <tbody id='sells_chart_table'  >
                    <tr>
                        <th>Total Sale:</th>
                        <td>{sellsData.soldItems.toFixed(1)}</td>
                    </tr>
                    <tr>
                        <th>Total Sold Items:</th>
                        <td>{sellsData.soldItemsCount}</td>
                    </tr>
                    <tr>
                        <th>Total Not Sold Items:</th>
                        <td>{sellsData.unsoldItemsCount}</td>
                    </tr>
                </tbody>
            </div>
        </div>
    )
}

export default SellsChart