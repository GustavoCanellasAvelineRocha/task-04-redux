import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import style from "./Register.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { CustomError, LoginData } from "../../utils/interfaces";
import { useEffect } from "react";
import { useRegisterMutation } from "../../services/registerApi";

const schema = yup.object().shape({
  email: yup.string().required("Obrigatório").email("Email inválido."),
  password: yup.string().required("Obrigatório"),
});

export default function Register() {
  const navigate = useNavigate();
  const [registerApi, { isLoading, isSuccess, isError, error }] =
    useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (dataLogin: LoginData) => {
    try {
      await registerApi(dataLogin);
    } catch (error) {
      console.error("Login falhou:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
    if (isError) {
      const customError = error as CustomError;
      alert("Erro! " + customError.data.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isError, isSuccess, navigate]);

  return (
    <>
      <section className={style.loginContainer}>
        <div className={style.formContainer}>
          <h1 className={style.title}>Filmux</h1>
          <h2 className={style.subtitle}>Cadastro</h2>

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
              Cadastrar
            </LoadingButton>

            <div className={style.formLinks}>
              <p className={style.forgetPassword}>
                Ja possui uma conta?{" "}
                <RouterLink to={"/"} className={style.links}>
                  Entrar com cadastro
                </RouterLink>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
