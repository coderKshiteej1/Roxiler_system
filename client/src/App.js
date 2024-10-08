import logo from './logo.svg';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Statasitics from './Components/Statistics/index';
import TransactionsTable from './Components/TransactionsTable/index';
import CombineJson from './Components/CombineJson/Index';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<TransactionsTable />} />
      <Route path="statistic" element={<Statasitics />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
