import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Alert, Snackbar, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { CustomError, LoginData } from "../../utils/interfaces";
import { useLoginMutation } from "../../services/loginApi";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { showOptions } from "../../slices/NavBarSlice";
import { setToken } from "../../slices/TokenSlice";
import { changeMessage, showSnackbarSuccess } from "../../slices/snackBarSlice";

const schema = yup.object().shape({
  email: yup.string().required("Obrigatório").email("Email inválido."),
  password: yup.string().required("Obrigatório"),
});

export default function Login() {
  const navigate = useNavigate();
  const [loginUser, { data, isLoading, isSuccess, isError, error }] =
    useLoginMutation();
  const dispatch = useAppDispatch();
  const [errorSnackbarOpen, seterrorSnackbarOpen] = useState(false);
  const [msgError, setMsgError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (dataLogin: LoginData) => {
    try {
      await loginUser(dataLogin);
    } catch (error) {
      console.error("Login falhou:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken(data.token));
      dispatch(showOptions());
      dispatch(changeMessage("Bem vindo!"));
      dispatch(showSnackbarSuccess());
      navigate("/buy");
    }
    if (isError) {
      const customError = error as CustomError;
      setMsgError("Erro! " + customError.data.error);
      handleClickerror();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isError, isSuccess, navigate]);

  const handleClickerror = () => {
    seterrorSnackbarOpen(true);
  };

  const handleCloseerrorSnackbar = () => {
    seterrorSnackbarOpen(false);
  };

  return (
    <>
      <section className={style.loginContainer}>
        <div className={style.formContainer}>
          <h1 className={style.title}>Filmux</h1>
          <h2 className={style.subtitle}>Entrar</h2>

          <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
            <div className={style.field}>
              <TextField
                id="email"
                label="Email"
                variant="standard"
                color="secondary"
                className={style.input}
                error={!!errors.email}
                {...register("email")}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div className={style.field}>
              <TextField
                id="password"
                label="Senha"
                variant="standard"
                color="secondary"
                type="password"
                className={style.input}
                error={!!errors.password}
                {...register("password")}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>

            <LoadingButton
              variant="contained"
              size="large"
              className={style.buttonLogin}
              type="submit"
              loading={isLoading}
              loadingPosition="center"
            >
              Entrar
            </LoadingButton>

            <div className={style.formLinks}>
              <p className={style.forgetPassword}>
                Não possui uma conta?{" "}
                <RouterLink to={"/register"} className={style.links}>
                  Cadastre-se
                </RouterLink>
              </p>
            </div>
          </form>
        </div>
        <Snackbar
          open={errorSnackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseerrorSnackbar}
        >
          <Alert
            onClose={handleCloseerrorSnackbar}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {msgError}
          </Alert>
        </Snackbar>
      </section>
    </>
  );
}
