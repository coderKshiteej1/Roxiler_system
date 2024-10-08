import React, { useEffect, useRef } from 'react'

const PaginationController = (params) => {

  const { filters, setFilters, transCount } = params;

  const prevBtn = useRef(null);
  const nextBtn = useRef(null);

  useEffect(() => { 

    if (prevBtn.current) {
      if (filters.page > 1) {
        prevBtn.current.classList.add("opacity100");
        prevBtn.current.classList.remove("opacity50");
      } else {
        prevBtn.current.classList.add("opacity50");
        prevBtn.current.classList.remove("opacity100");
      }
    }

    if (nextBtn.current) {
      
      if (transCount == filters.perPage) {
        nextBtn.current.classList.add("opacity100");
        nextBtn.current.classList.remove("opacity50");
      } else {
        nextBtn.current.classList.add("opacity50");
        nextBtn.current.classList.remove("opacity100");
      }
    }

  }, [filters,transCount])



  return (
    <div className='pagination-main'>
      <span>Page No: {filters.page}</span>
      <div>
        <button className='default-btn' ref={prevBtn} onClick={() => setFilters({ ...filters, page: filters.page - 1 })}>Previous</button>

        <button className='default-btn' ref={nextBtn} onClick={() => setFilters({ ...filters, page: filters.page + 1 })}>Next</button>

      </div>
      <select id="perPageSelect" className='default-input' onChange={(e) => setFilters({ ...filters, perPage: e.target.value })}>
        <option value={2}>Per Page 2</option>
        <option value={5}>Per Page 5</option>
        <option value={10} selected>Per Page 10</option>
        <option value={50}>Per Page 50</option>
        <option value={100}>Per Page 100</option>
      </select>
    </div>
  )
}

export default PaginationController