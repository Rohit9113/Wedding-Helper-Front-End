import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Reviews() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedComments, setExpandedComments] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("");
  const navigate = useNavigate();

  const vendorsPerPage = 5; // Adjust as needed

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const role = localStorage.getItem("role");

        if (!token || !role) {
          throw new Error("Unauthorized: No token or role found");
        }

        const response = await fetch("http://localhost:3000/admin/vendors/ratings-comments", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setVendors(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const toggleExpandComment = (vendorId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [vendorId]: !prev[vendorId],
    }));
  };

  const filteredVendors = vendors
    .filter((vendor) =>
      vendor.shopName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((vendor) =>
      filterRating ? vendor.latestComment?.rating === parseInt(filterRating) : true
    );

  const totalPages = Math.ceil(filteredVendors.length / vendorsPerPage);
  const startIndex = (currentPage - 1) * vendorsPerPage;
  const displayedVendors = filteredVendors.slice(startIndex, startIndex + vendorsPerPage);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  const handleViewMore = (vendorId) => {
    navigate(`/admin/all-reviews/${vendorId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-100 min-h-screen"
    >
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Vendor Reviews</h2>

      {/* Search & Filter */}
      <div className="mb-4 flex flex-wrap justify-between">
        <input
          type="text"
          placeholder="Search by shop name..."
          className="px-3 py-2 border rounded-lg w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-3 py-2 border rounded-lg w-40"
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value)}
        >
          <option value="">All Ratings</option>
          <option value="5">⭐ 5</option>
          <option value="4">⭐ 4</option>
          <option value="3">⭐ 3</option>
          <option value="2">⭐ 2</option>
          <option value="1">⭐ 1</option>
        </select>
      </div>

      {/* Reviews Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-3 px-5 border w-14">Shop Name</th>
              <th className="py-3 px-5 border w-14">User Name</th>
              <th className="py-0 px-0 border w-0">Rating</th>
              <th className="py-3 px-5 border w-32">Latest Comment</th>
              <th className="py-0 px-0 border w-0">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedVendors.map((vendor) => {
              const comment = vendor.latestComment?.text || "";
              const words = comment.split(" ");
              const shouldShowExpand = words.length > 25;
              const isExpanded = expandedComments[vendor.vendorId];
              const displayedComment = isExpanded ? comment : words.slice(0, 30).join(" ") + (shouldShowExpand ? "..." : "");

              return (
                <motion.tr
                  key={vendor.vendorId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="border-b hover:bg-gray-100 transition duration-300"
                >
                  <td className="py-3 px-5 border">{vendor.shopName}</td>
                  {vendor.latestComment ? (
                    <>
                      <td className="py-3 px-5 border">{vendor.latestComment.userName}</td>
                      <td className="py-0 px-0 border">⭐ {vendor.latestComment.rating || "N/A"}</td>
                      <td className="py-3 px-5 border w-64 whitespace-normal break-words">
                        {displayedComment}
                        {shouldShowExpand && (
                          <button
                            onClick={() => toggleExpandComment(vendor.vendorId)}
                            className="text-blue-500 ml-2 hover:underline"
                          >
                            {isExpanded ? "Hide" : "View More"}
                          </button>
                        )}
                      </td>
                    </>
                  ) : (
                    <td className="py-3 px-5 border" colSpan="3">No recent comments</td>
                  )}
                  <td className="py-0 px-0 border text-center">
                    <button
                      onClick={() => handleViewMore(vendor.vendorId)}
                      className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition"
                    >
                      View Details
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 border rounded-lg bg-white">{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </motion.div>
  );
}

export default Reviews;
