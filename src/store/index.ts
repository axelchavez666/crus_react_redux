import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";
import userReducer, { rollbackUser } from "./users/slice";

const persistanceLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		next(action);
		localStorage.setItem("redux_state", JSON.stringify(store.getState()));
	};

const syncWithDatabase: Middleware = (store) => (next) => (action) => {
	const { type, payload } = action;

	// fase 1
	const previousState = store.getState();

	next(action);

	//fase 2
	if (type === "users/deleteUserById") {
		const userToRemove = previousState.users.find(
			(user) => user.id === payload,
		);
		fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
			method: "DELETE",
		})
			.then((res) => {
				if (res.ok) {
					toast.success(`User deleted ${payload}`);
				}
				throw new Error("Error deleting user");
			})
			.catch((err) => {
				toast.error("Error deleting user");
				if (userToRemove) store.dispatch(rollbackUser(userToRemove));
				console.log(err);
			});
	}
};

export const store = configureStore({
	reducer: {
		users: userReducer,
	},
	middleware: [persistanceLocalStorageMiddleware, syncWithDatabase],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
