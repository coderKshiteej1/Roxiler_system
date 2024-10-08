import React, { useEffect, useState } from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';
import MonthDropDown from '../../TransactionsTable/microComp/MonthDropDown';

const BarChart_ = () => {

    const Yaxis = ["0-100", "100-200", "200-300", "300-400", "400-500", "500-600", "600-700", "700-800", "800-900", "900+"];
    const [Xaxis, setXaxis] = useState([]);
    const [filters, setFilters] = useState({
        month: "march"
    });

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URI}/transactions/statistics/barChart/get`, {
                params: filters
            });
            setXaxis(response.data);

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
                <h2>
                    Bar Chart - <span style={{ textTransform: "capitalize" }}>{filters.month}</span>
                </h2>
                <MonthDropDown setFilters={setFilters} filters={filters} />
            </div>
            <BarChart
                className='margin_auto chart'
                xAxis={[{ scaleType: 'band', data: Yaxis }]}
                series={[{ data: Xaxis }]}
                height={300}
            />

        </div>
    )
}

export default BarChart_