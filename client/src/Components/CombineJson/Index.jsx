import React, { useState } from 'react'
import NabBar from '../utility/Navbar/NavBar'
import axios from 'axios';
import { useEffect } from 'react';
import MonthDropDown from '../TransactionsTable/microComp/MonthDropDown';
import CodeEditor from '@uiw/react-textarea-code-editor';

const CombineJson = () => {

    const [json, setJson] = useState();

    const [filters, setFilters] = useState({
        month: "march"
    });

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URI}/transactions/statistics/combine/get`, {
                params: filters
            });
            setJson(response.data);

        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filters]);

    return (
        <div className='Statistics-container boxShadow'>
            <div  className='flex_space_center'>
                <h2 >
                    Combine Json -  <span style={{textTransform:"capitalize"}}>{filters.month}</span>
                </h2>
                <MonthDropDown setFilters={setFilters} filters={filters} />
            </div>
            <div >
                <CodeEditor
                  className='margin_auto chart'
                    value={JSON.stringify(json)}
                    language="js"
                    placeholder="Json is loading"
                    padding={15}
                    style={{
                        backgroundColor: "#f5f5f5",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                />
            </div>
        </div>
    )
}

export default CombineJson