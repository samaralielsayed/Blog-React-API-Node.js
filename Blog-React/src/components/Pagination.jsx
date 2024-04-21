import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';

export default function Pagination(props) {
   const {noOfPages,currentPage,handleSelectPage,setSearchParams} = props;
console.log('props',noOfPages.length )
// const [searchParams] = useSearchParams();
// const name = searchParams.get("samar");
// useEffect(()=>{
//   setSearchParams('page',currentPage)
// },[currentPage])
console.log("curentpage", currentPage);

  return (
    <div className="flex justify-center join mb-3">
        {noOfPages.map((page) => (
          <button
            onClick={() => {handleSelectPage(page + 1)
              setSearchParams({ page: page + 1 });}}
            className={`join-item btn btn-sm px-4 ${
              currentPage !== page + 1 && " btn-active  bg-slate-50"
            }`}
            key={page + 1}
          >
            {page + 1}
          </button>
        ))}
      </div>
  )
}
