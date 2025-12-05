import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const locationApi = createApi({
  reducerPath: "locationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tu-servidor.com/api", // cambia esta URL
  }),
  endpoints: (builder) => ({
    sendLocation: builder.mutation({
      query: (body) => ({
        url: "/guardar-ubicacion",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSendLocationMutation } = locationApi;