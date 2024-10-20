import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Layout from "./pages/Layout";
import Missing from "./pages/Missing";
import Unauthorized from "./pages/Unauthorized";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./pages/RequireAuth";
import Logout from "./pages/Logout";
import Success from "./pages/Success";
import Donate from "./pages/Donate";
import AdminLayout from "./pages/AdminLayout";
import AdminDash from "./pages/admin/AdminDash";
import CreateRequest from "./pages/admin/CreateRequest";
import AddDonation from "./pages/admin/AddDonation";
import EditRequest from "./pages/admin/EditRequest";
import AddDonationQr from "./pages/admin/AddDonationQr";

const ROLES = {
  User: process.env.REACT_APP_USER_ROLE,
  Admin: process.env.REACT_APP_ADMIN_ROLE,
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/*public routes */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="logout" element={<Logout />} />

          {/*protected routes*/}
          {/* protected for users */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={ROLES.User} />}>
              <Route path="feed" element={<Feed />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="donate/:id" element={<Donate />} />
              <Route path="success" element={<Success />} />
            </Route>

            {/* protected for admins */}
            <Route element={<RequireAuth allowedRoles={ROLES.Admin} />}>
              <Route path="admin" element={<AdminLayout />}>
                <Route path="dash" element={<AdminDash />} />
                <Route path="cretreq" element={<CreateRequest />} />
                <Route path="newdon" element={<AddDonation />} />
                <Route path="editreq/:id" element={<EditRequest />} />
                <Route
                  path="newdon/qr/:reqid/:userid"
                  element={<AddDonationQr />}
                />
              </Route>
            </Route>
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
