import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BASE_SERVER_URL,
  GARAGE_PATH,
  GARAGE_TAG,
  USER_PATH,
} from "constants/constants";
import { Car, UserState } from "types/types";

// Define a service using a base URL and expected endpoints
export const garageApi = createApi({
  reducerPath: "garageApi",
  tagTypes: [GARAGE_TAG],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_SERVER_URL }),
  endpoints: (builder) => ({
    getCars: builder.query<Car[], void>({
      query: () => `${GARAGE_PATH}`,
      providesTags: [GARAGE_TAG],
    }),
    getUser: builder.query<UserState, void>({
      query: () => `${USER_PATH}`,
    }),
    updateCar: builder.mutation<void, Car>({
      query: (car) => ({
        method: "PUT",
        url: `${GARAGE_PATH}/${car.id}`,
        body: car,
      }),
      invalidatesTags: [GARAGE_TAG],
    }),
    deleteCar: builder.mutation<void, number>({
      query: (id) => ({ method: "DELETE", url: `${GARAGE_PATH}/${id}` }),
      invalidatesTags: [GARAGE_TAG],
    }),
  }),
});

export const {
  useGetCarsQuery,
  useLazyGetUserQuery,
  useDeleteCarMutation,
  useUpdateCarMutation,
} = garageApi;
