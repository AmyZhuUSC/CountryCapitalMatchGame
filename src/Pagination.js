import React, { useState, useEffect } from "react";
import data from "./data.js";

export default function Pagination({ num = 10 }) {
  const [isLoading, setIsloading] = useState(false);

  const [pageNum, setPageNum] = useState(1);
  const [dataInPage, setDataInPage] = useState([]);
  const totalPage = Math.ceil(data.count / num);

  useEffect(() => {
    if ((pageNum - 1) * num + 10 < data.count - 1) {
      setDataInPage(
        data.results.slice((pageNum - 1) * num, (pageNum - 1) * num + 10)
      );
    } else {
      setDataInPage(data.results.slice((pageNum - 1) * num));
    }
  }, [pageNum]);

  function handlePageData(item) {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.firstName}</td>
        <td>{item.lastName}</td>
      </tr>
    );
  }

  return (
    <div className="pagination ">
      <div>Pagination</div>
      <button
        onClick={() => setPageNum(1)}
        className="first-page-btn"
        disabled={isLoading === true || pageNum === 1 ? true : false}>
        First
      </button>
      <button
        onClick={() => setPageNum(pageNum - 1)}
        className="previous-page-btn"
        disabled={isLoading === true || pageNum === 1 ? true : false}>
        Previous
      </button>
      <button
        onClick={() => setPageNum(pageNum + 1)}
        disabled={isLoading === true || pageNum === totalPage ? true : false}>
        Next
      </button>
      <button
        onClick={() => setPageNum(totalPage)}
        disabled={isLoading === true || pageNum === totalPage ? true : false}>
        Last
      </button>
      <table>
        <thead>
          <tr>
            <th> id </th>
            <th> firstName </th>
            <th> lastName </th>
          </tr>
        </thead>

        <tbody>{dataInPage.map((item) => handlePageData(item))}</tbody>
      </table>
    </div>
  );
}
