import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { urlApiReqres } from "../utils/api";
import { LoginData } from "../utils/interfaces";

export const registerApi = createApi({
  reducerPath: "registerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${urlApiReqres}`,
  }),
  tagTypes: ["RegisterData"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body: LoginData) => {
        return {
          url: `register`,
          method: "post",
          body,
        };
      },
    }),
  }),
});

export const { useRegisterMutation } = registerApi;
