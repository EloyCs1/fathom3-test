import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BASE_SERVER_URL,
  GARAGE_PATH,
  GARAGE_TAG,
  TYPES_EN_PATH,
  TYPES_ES_PATH,
  USER_PATH,
} from "constants/constants";
import { Car, Types, UserState } from "types/types";

// Define a service using a base URL and expected endpoints
export const garageApi = createApi({
  reducerPath: "garageApi",
  tagTypes: [GARAGE_TAG],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_SERVER_URL }),
  endpoints: (builder) => ({
    getUser: builder.query<UserState, void>({
      query: () => `${USER_PATH}`,
    }),
    getCars: builder.query<Car[], void>({
      query: () => `${GARAGE_PATH}`,
      providesTags: [GARAGE_TAG],
    }),
    getTypes: builder.query<Types, { language: string }>({
      queryFn: async (arg, api, extraOptions, baseQuery) => {
        const response = await baseQuery({
          url: arg.language === "es" ? TYPES_ES_PATH : TYPES_EN_PATH,
        });

        return { data: response.data as Types };
      },
    }),
    setCar: builder.mutation<void, Car>({
      query: (car) => ({
        method: "POST",
        url: `${GARAGE_PATH}`,
        body: car,
      }),
      invalidatesTags: [GARAGE_TAG],
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
  useGetTypesQuery,
  useLazyGetUserQuery,
  useSetCarMutation,
  useDeleteCarMutation,
  useUpdateCarMutation,
} = garageApi;
