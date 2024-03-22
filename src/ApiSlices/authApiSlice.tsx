import { apiSlice } from "../app/api/apiSlice"
import {logOut, setCredentials} from "./authSlice"

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(logOut())
          dispatch(apiSlice.util.resetApiState())
        } catch (err) {
          console.log(err)
        }
      }
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log(data)
          const { accessToken, currentUser } = data
          dispatch(setCredentials({ accessToken, currentUser }))
        } catch (err) {
          console.log(err)
        }
      }
    }),
    googleCallbackTeacher: builder.mutation({
      query: (body) => ({
        url: '/auth/google/callback',
        method: 'POST',
        body
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log(data)
          const { accessToken, currentUser } = data
          dispatch(setCredentials({ accessToken, currentUser: currentUser }))
        } catch (err) {
          console.log(err)
        }
      }
    }),
    githubCallback: builder.mutation({
      query: () => ({
        url: '/auth/google/callback',
        method: 'GET',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log(data)
          const { accessToken, currentUser } = data
          dispatch(setCredentials({ accessToken, currentUser: currentUser }))
        } catch (err) {
          console.log(err)
        }
      }
    }),
  })
})

export const {
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation,
  useGoogleCallbackTeacherMutation,
  useGithubCallbackMutation
} = authApiSlice