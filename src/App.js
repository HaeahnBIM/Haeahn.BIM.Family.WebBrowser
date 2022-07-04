import './App.css';
import DataGrid from './Table/DataTable';

function App() {
  return (
    <div className="App">
      <DataGrid  />
    </div>
  );
}

export default App;


// import React from "react";
// import "./App.css";
// import FamilyListTable from "./components/FamilyListTable";
// import EmployeeProfile from "./components/EmployeeProfile";
// import DepartmentFilter from "./components/DepartmentFilter";
// import EmployeeListTable from "./components/EmployeeListTable";
// import DropdownFilters from "./components/DropdownFilter";
// import WorkTypeFilter from "./components/WorkTypeFilter";
// import SearchBar from "./components/SearchBar";
// import SearchField from "./components/SearchField";
// import { Divider, Stack } from "@mui/material";

// function App() {
//   return (
//     <div>
//       <main>
//         <Stack
//           direction={"row"}
//           divider={<Divider orientation="vertical" flexItem />}
//           spacing={2}
//         >
//           <Stack spacing={2}>
//             <EmployeeProfile></EmployeeProfile>
//             <p>열람 결과 00건</p>
//             <DepartmentFilter></DepartmentFilter>
//           </Stack>
//           <Stack spacing={2}>
//             <SearchBar></SearchBar>
//             <div>
//               <Stack
//                 direction={"row"}
//                 divider={<Divider orientation="vertical" flexItem />}
//                 spacing={2}
//               >
//                 <Stack direction={"row"} spacing={2}>
//                   <p>PJ코드/명칭</p>
//                   <SearchField></SearchField>
//                   <p>임직원</p>
//                   <SearchField></SearchField>
//                 </Stack>
//                 <Stack direction={"row"}>
//                   <p>주용도</p>
//                   <DropdownFilters></DropdownFilters>
//                   <p>복합용도1</p>
//                   <DropdownFilters></DropdownFilters>
//                   <p>복합용도2</p>
//                   <DropdownFilters></DropdownFilters>
//                 </Stack>
//               </Stack>
//               <div>
//                 <Stack
//                   direction="column"
//                   divider={<Divider orientation="horizontal" flexItem />}
//                   spacing={2}
//                 >
//                   <EmployeeListTable></EmployeeListTable>
//                   <Stack
//                     direction="row"
//                     divider={<Divider orientation="vertical" flexItem />}
//                     spacing={2}
//                   >
//                     <FamilyListTable></FamilyListTable>
//                     <EmployeeListTable></EmployeeListTable>
//                     <EmployeeListTable></EmployeeListTable>
//                   </Stack>
//                 </Stack>
//               </div>
//             </div>
//           </Stack>
//         </Stack>
//       </main>
//     </div>
//   );
// }

// export default App;
