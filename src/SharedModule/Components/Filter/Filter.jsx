import React, { useState } from "react";

export default function Filter({ getItems}) {

  const [searchBy,setSearchBy]=useState('Customer Name');

  const getSearchValue = (input) => {
    getItems(input.target.value,searchBy);
  };
  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };
  return (
    <div className="w-100">

      <div className="row mb-5 mt-3 ms-4 justify-content-center gx-0">
        <div className="col-lg-4 col-md-5 col-sm-7 me-1 mt-1">
          <input
            type="text"
            className="form-control py-2"
            placeholder="Search Here..."
            onChange={debounce(getSearchValue,500)}
          />
        </div>

        <div className="col-lg-3 col-md-4 col-sm-4 me-1 mt-1">
              <select className="form-select py-2" 
              onChange={(e)=>setSearchBy(e.target.value)}
              >
                <option value="" disabled>Search by</option>
                <option>Customer Name</option>
                <option>Transaction Amount</option>
              </select>
            </div>

      </div>

    </div>
  );
}
