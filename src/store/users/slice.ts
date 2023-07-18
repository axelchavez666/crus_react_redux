import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserId = string;

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface UserWithId extends User {
	id: UserId;
}

const initialState: UserWithId[] = [
	{
		id: "1",
		name: "Peter Doe",
		email: "test",
		github: "test",
	},
	{
		id: "2",
		name: "Axel Chavez",
		email: "test axel",
		github: "axelchavez666",
	},
];

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
	},
});

export default usersSlice.reducer;

export const { deleteUserById } = usersSlice.actions;
