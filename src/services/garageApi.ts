import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_SERVER_URL, GARAGE_PATH, USER_PATH } from "constants/constants";
import { Car, UserState } from "types/types";

// Define a service using a base URL and expected endpoints
export const garageApi = createApi({
  reducerPath: "garageApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_SERVER_URL }),
  endpoints: (builder) => ({
    getCars: builder.query<Car[], void>({
      query: () => `${GARAGE_PATH}`,
    }),
    getUser: builder.query<UserState, void>({
      query: () => `${USER_PATH}`,
    }),
    deleteCar: builder.query<void, number>({
      query: (id) => ({ method: "DELETE", url: `${GARAGE_PATH}/${id}` }),
    }),
  }),
});

export const { useGetCarsQuery, useLazyGetUserQuery, useLazyDeleteCarQuery } =
  garageApi;
