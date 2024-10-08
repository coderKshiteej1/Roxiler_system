import React from 'react'

const MonthDropDown = (params) => {
    const { filters, setFilters } = params;
    return (
        <select className='default-input' value={filters.month} onChange={(e) => setFilters({ ...filters, month: e.target.value })}>
            <option value="january">January</option>
            <option value="february">February</option>
            <option value="march">March</option>
            <option value="april">April</option>
            <option value="may">May</option>
            <option value="june">June</option>
            <option value="july">July</option>
            <option value="august">August</option>
            <option value="september">September</option>
            <option value="october">October</option>
            <option value="november">November</option>
            <option value="december">December</option>
        </select>
    )
}

export default MonthDropDown