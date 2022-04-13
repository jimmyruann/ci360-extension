import { Group, Select, InputWrapper, Input, Button } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import z from "zod";

interface EnvFormProps {
	handleSubmit: (values: { type: string; accountId: string }) => void;
}

const envFormSchema = z.object({
	type: z.string().min(1, "Select an environment type"),
	accountId: z.string().min(1, "Enter account ID"),
});

export const EnvForm = ({ handleSubmit }: EnvFormProps) => {
	const isAtAccountPage = new RegExp(/\/account\/(saas|managed)\/\d+/).test(window.location.pathname);
	let initialValues = {
		type: "",
		accountId: "",
	};

	if (isAtAccountPage) {
		const [_, type, accountId] = window.location.pathname.substring(1).split("/");
		initialValues = {
			type,
			accountId,
		};
	}

	const form = useForm({
		schema: zodResolver(envFormSchema),
		initialValues,
	});

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Group direction='column' grow>
				<Select
					label='Environment Type'
					description={
						<>
							Usually can be find in the url https://ci360.dynatrace.com/account/<b>{`<env-type>`}</b>/1234
						</>
					}
					placeholder='Pick one'
					required
					data={[
						{ value: "saas", label: "SaaS" },
						{ value: "managed", label: "Managed" },
					]}
					{...form.getInputProps("type")}
				/>

				<InputWrapper
					required
					label='Account ID'
					description={
						<>
							Usually can be find in the url https://ci360.dynatrace.com/account/managed/<b>{`<id>`}</b>
						</>
					}
					error={form.getInputProps("accountId").error}>
					<Input placeholder='Account ID' {...form.getInputProps("accountId")} />
				</InputWrapper>

				<Button color='cyan' fullWidth type='submit'>
					Grab Data
				</Button>
			</Group>
		</form>
	);
};

export default EnvForm;
