import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import ListUsers from "./pages/users/Index";
import ListSectores from "./pages/sectores/Index";
import Login from "./pages/users/Login";
import Signup from "./pages/users/Signup";
import CreateSector from "./pages/sectores/Create";
import ListDocuments from "./pages/documents/Index";
import CreateDocument from "./pages/documents/Create";
import ProtectedRoute from "./protectedRoute";
import PublicRoute from "./publicRoute";
import CallPDF from "./pages/documents/Display";
import EditSector from "./pages/sectores/Edit";

export function AppRoutes() {
  // const [currentUser, setCurrentUser] = useState();
  // setCurrentUser(localStorage.getItem("accessToken"));

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<PublicRoute />}>
          <Route path="accounts/login" element={<Login />} />
        </Route> */}

        <Route path="accounts/login" element={<Login />} />
        <Route path="accounts/logout" />


        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<App />} />
          <Route path="accounts/create" element={<Signup />} />
          <Route path="accounts" element={<ListUsers />} />
          <Route path="sectores" element={<ListSectores />} />
          <Route path="sectores/create" element={<CreateSector />} />
          <Route path="sectores/edit" element={<EditSector />} />

          <Route path="normas" element={<ListDocuments />} />
          <Route path="viewPdf" element={<CallPDF />} />
          <Route path="normas/create" element={<CreateDocument />} />
        </Route>
      </Routes>
    </Router>
  );
}
