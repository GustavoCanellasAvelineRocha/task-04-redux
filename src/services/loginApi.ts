import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { urlApiReqres } from "../utils/api";
import { LoginData } from "../utils/interfaces";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${urlApiReqres}`,
  }),
  tagTypes: ["LoginData"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: LoginData) => {
        return {
          url: `login`,
          method: "post",
          body,
        };
      },
    }),
  }),
});

export const { useLoginMutation } = loginApi;
