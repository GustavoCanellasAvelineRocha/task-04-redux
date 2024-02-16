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
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { Alert, Snackbar } from "@mui/material";
import { dontShowSnackbarSuccess } from "./slices/snackBarSlice";
import { CheckCircle } from "@phosphor-icons/react";

function App() {
  const showSuccess = useAppSelector(
    (state) => state.snackBar.showSnackBarSuccess
  );
  const dispatch = useAppDispatch();

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

        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={() => dispatch(dontShowSnackbarSuccess())}
        >
          <Alert
            variant="filled"
            severity="success"
            onClose={() => dispatch(dontShowSnackbarSuccess())}
          >
            <CheckCircle fontSize="inherit" style={{ marginRight: "0.5em" }} />
            Bem vindo!
          </Alert>
        </Snackbar>

        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
