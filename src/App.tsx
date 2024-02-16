import { BrowserRouter, Route, Routes } from "react-router-dom";
import Buy from "./pages/buy/Buy";
import Container from "./components/container/Container";
import NavBar from "./components/navBar/NavBar";
import Cart from "./pages/cart/Cart";
import Describe from "./pages/describe/Describe";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/login/Login";
import Footer from "./components/footer/footer";
import Register from "./pages/register/Register";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import PublicRoute from "./components/publicRoute/PublicRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar></NavBar>
        <Container>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/" element={<Login />} />
              <Route path="/Register" element={<Register />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/Buy" element={<Buy />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/describe/:id" element={<Describe />} />
              <Route path="/*" element={<NotFound />} />
            </Route>
          </Routes>
        </Container>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
