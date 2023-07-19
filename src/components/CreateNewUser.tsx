import { Button, Card, TextInput, Title } from "@tremor/react";
import { useUserActions } from "../hooks/useUsersActions";

export function CreateNewUser() {
	const { addUser } = useUserActions();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);

		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;

		addUser({ name, email, github });
		form.reset();
	};

	return (
		<Card style={{ marginTop: "16px" }}>
			<Title>Create New User</Title>

			<form onSubmit={handleSubmit} className="">
				<TextInput name="name" placeholder="Name" />
				<TextInput name="email" placeholder="Email" />
				<TextInput name="github" placeholder="GitHub" />

				<div>
					<Button type="submit" style={{ marginTop: "16px" }}>
						Create User
					</Button>
				</div>
			</form>
		</Card>
	);
}
