import React, { useState, useMemo } from "react";

function Dashboard({ data = [], setIsAuthenticated = () => {} }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
    const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [replyWindow,setReplyWindow] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sending email:', { to, subject, content });
    setTo('');
    setSubject('');
    setContent('');
  };

  const handleClick =(index)=>{
    setReplyWindow(true)
    const details = data[index]
    console.log(data,index);
    
    // setTo(details.email)

  }

  const closeReply=()=>setReplyWindow(false)
  const sortedAndFilteredData = useMemo(() => {
    return [...data]
      .filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      });
  }, [data, sortDirection, searchTerm]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedAndFilteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedAndFilteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedAndFilteredData.length / itemsPerPage);

  const handleSort = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };
  const handleSignOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Shipment Dashboard</h1>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>

      <div className="mb-4 pt-16">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {Object.keys(data[0] || {}).map((key) => (
                <th
                  key={key}
                  className="px-4 py-2 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {key === "date" ? (
                    <button
                      onClick={handleSort}
                      className="flex items-center uppercase"
                      aria-sort={sortDirection}
                    >
                      {key}
                      <span className="ml-1">
                        {sortDirection === "asc" ? "▲" : "▼"}
                      </span>
                    </button>
                  ) : (
                    key
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                {Object.entries(item).map(([key, value]) => (
                  <td key={key} className="px-4 py-2 cursor-pointer" onClick={()=>{
                    if(key === 'replied' && value == false)
                      handleClick()
                  }}> 
                    {key === "replied" ? (value ? "Yes" : "No") : key==='date'? new Date(value).toLocaleString() :value.toString()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div>
          <span className="mr-2 text-white">Items per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="text-white">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded mr-2 disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded ml-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

{replyWindow && 
      <div  className="absolute w-full -bottom-0 right-0"> <div className="relative max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <button onClick={closeReply} className="absolute right-5">
         <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6  fill-black  rounded-md transition-colors duration-300"
                  viewBox="0 0 24 24"
                  stroke="#21428B"
                  >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
      </button>
      <h2 className="text-2xl font-bold mb-6">Compose Reply</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="to" className="block text-sm font-medium text-gray-700">
            To:
          </label>
          <input
            type="email"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
            Subject:
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Message:
          </label>
          <textarea
            id="content"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
            Send Reply
          </button>
        </div>
      </form>
    </div></div>
    }
    </div>
  );
}

export default Dashboard;