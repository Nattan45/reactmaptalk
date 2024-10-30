// import React, { useEffect, useState } from "react";

// import Paginator from "../../paginator/Paginator";
// import CheckpointsData from "../../../data/CheckpointsData"; // Importing dummy data

// const CheckpointsCategoryList = () => {
//   const [deviceData, setDeviceData] = useState([]); // State for the full data
//   const [currentPage, setCurrentPage] = useState(1); // State for current page
//   const [itemsPerPage] = useState(10); // Number of items per page
//   const [visibleCategory, setVisibleCategory] = useState(null); // State to control the visibility of each category's checkpoints list

//   // Simulating fetching data from a database (replace this with an actual API call)
//   useEffect(() => {
//     const fetchData = async () => {
//       setDeviceData(CheckpointsData); // Load the dummy data into state
//     };
//     fetchData(); // Call the fetch function
//   }, []);

//   // Calculate the current items to display on the current page
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = deviceData.slice(indexOfFirstItem, indexOfLastItem); // Slice the data based on current page

//   // Calculate the total number of pages
//   const totalPages = Math.ceil(deviceData.length / itemsPerPage);

//   // Function to handle page change
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber); // Set the new page number
//   };

//   // Function to toggle the visibility of a category's checkpoints list
//   const toggleCategoryVisibility = (index) => {
//     setVisibleCategory(visibleCategory === index ? null : index);
//   };
//   return (
//     <div className="checkpointsCategoryList marginTB">
//       <div className="checkpintsList fitContent">
//         <h2 className="tableDataHeaderTitle">
//           All {deviceData.length} Checkpoints Categories
//         </h2>
//         <table border="1" cellPadding="10">
//           <thead>
//             <tr>
//               <th>Category Name</th>
//               <th>Checkpoints List</th>
//               <th>Edit</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.map((category, index) => (
//               <tr key={index}>
//                 <td>{category.categoryName}</td>
//                 <td>
//                   {currentItems.map((category, categoryIndex) => (
//                     <div key={categoryIndex} className="categoryContainer">
//                       <div className="categoryHeader">
//                         {/* Display the category name and the number of checkpoints */}
//                         <div className="categoryInfo">
//                           <p>
//                             Total of &nbsp;
//                             {category.checkpointList.length}
//                             &nbsp; Checkpoints &nbsp;
//                           </p>
//                         </div>

//                         {/* SVG button to toggle the visibility of the checkpoints list */}
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="24"
//                           height="24"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           className="lucide lucide-chevron-down"
//                           onClick={() =>
//                             toggleCategoryVisibility(categoryIndex)
//                           }
//                         >
//                           <path d="m6 9 6 6 6-6" />
//                           {visibleCategory === categoryIndex
//                             ? "Hide"
//                             : "Show"}{" "}
//                           Checkpoints
//                         </svg>
//                       </div>

//                       {/* Conditionally render the checkpoints list */}
//                       {visibleCategory === categoryIndex && (
//                         <div className="checkpointsList">
//                           {category.checkpointList.map((checkpoint, idx) => (
//                             <div key={idx} className="checkpointItem">
//                               <div className="checkpointsRectangel">
//                                 <strong>{checkpoint.RectangleName}:</strong>
//                                 <span>
//                                   [{checkpoint.LowerLeft[0].toFixed(5)}
//                                   ,&nbsp;&nbsp;
//                                   {checkpoint.LowerLeft[1].toFixed(5)}]
//                                 </span>
//                                 <span>
//                                   [{checkpoint.UpperRight[0].toFixed(5)}
//                                   ,&nbsp;&nbsp;
//                                   {checkpoint.UpperRight[1].toFixed(5)}]
//                                 </span>
//                               </div>
//                               <p>
//                                 <strong className="checkpointsRectangel-Area">
//                                   Area:
//                                 </strong>
//                                 {checkpoint.Area}
//                               </p>
//                               <br />
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </td>
//                 <td className="">
//                   {/* View icon */}
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="lucide lucide-eye"
//                   >
//                     <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
//                     <circle cx="12" cy="12" r="3" />
//                   </svg>
//                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                   {/* Edit icon */}
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="#000000"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="lucide lucide-file-pen-line"
//                   >
//                     <path d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" />
//                     <path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
//                     <path d="M8 18h1" />
//                   </svg>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <Paginator
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />
//       </div>
//     </div>
//   );
// };

// export default CheckpointsCategoryList;
import React from "react";

const CheckpointsCategoryList = () => {
  return <div>CheckpointsCategoryList Commented</div>;
};

export default CheckpointsCategoryList;
