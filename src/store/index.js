import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/UsersSlice";
import { albumsApi } from "./apis/albumsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { photosApi } from "./apis/photosApi";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        [albumsApi.reducerPath] : albumsApi.reducer,
        [photosApi.reducerPath] : photosApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(albumsApi.middleware)
        .concat(photosApi.middleware);
    }
});
setupListeners(store.dispatch);
export * from "./thunks/fetchUser";
export * from "./thunks/addUser";
export * from "./thunks/removeUser";
export {useFetchPhotosQuery, useAddPhotosMutation, useRemovePhotosMutation} from "./apis/photosApi";
export {useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation} from "./apis/albumsApi";