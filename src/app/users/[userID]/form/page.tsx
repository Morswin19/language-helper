import Form from "@/features/form/form";

export default function UserForm({ params }: { params: { userID: string } }) {
	return <Form userId={params.userID} />;
}
