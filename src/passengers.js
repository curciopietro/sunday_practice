import "./passengers.css";
import { useState, useEffect } from "react";
import Pagination from "./pagination";

export default function Passengers() {
  const [passengers, setPassengers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=50`, {
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        setPassengers(result.data);
        setTotalPages(result.totalPages);
      })
      .catch((error) => {});

    return () => {
      controller.abort();
    };
  }, [page]);

  const className = "Passengers" + (isLoading ? " loading" : "");

  return (
    <>
      <table className={className}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Company</td>
            <td>Country</td>
          </tr>
        </thead>
        <tbody>
          {passengers.map((p) => {
            return (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.airline.name}</td>
                <td>{p.airline.country}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        totalPages={totalPages}
        setPage={setPage}
        currentPage={page}
      />
    </>
  );
}
