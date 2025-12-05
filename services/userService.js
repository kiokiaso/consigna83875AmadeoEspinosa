import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery:fetchBaseQuery({baseUrl:'https://inicio-sesion-firebase-2d131-default-rtdb.firebaseio.com/'}),
    endpoints:(builder)=>({
        putProfilePicture:builder.mutation({
            query:({image,localId,nombre,telefono,bio})=>({
                url:`profilesPictures/${localId}.json`,
                method:"PUT",
                body:{
                    image,nombre,telefono,bio
                }
                
            }),
            
        }),
        putProfileSave:builder.mutation({
          query:({nombre,telefono,bio,localId,image})=>({
            url:`profilesPictures/${localId}.json`,
            method:"PUT",
            body:{
              nombre,telefono,bio,image
            }
          })
        }),
        getProfilePicture:builder.query({
            query:(localId)=>`profilesPictures/${localId}.json`
        })
    })
});

export const { usePutProfilePictureMutation, useGetProfilePictureQuery,usePutProfileSaveMutation } = userApi;
