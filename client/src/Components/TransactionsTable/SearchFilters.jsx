import React from 'react'
import MonthDropDown from './microComp/MonthDropDown';

const SearchFilters = (params) => {

    const { filters, setFilters } = params;

  return (
    <div className='search-main flex_space_center'>
        <input className='default-input special-sm'  type="text" placeholder='Search Transaction' onChange={(e)=>setFilters({...filters,search:e.target.value})}/>

        <MonthDropDown   setFilters={setFilters} filters={filters}/> 
    </div>
  )
}

export default SearchFilters