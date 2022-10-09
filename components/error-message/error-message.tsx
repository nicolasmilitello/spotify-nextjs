// types
type ErrorMessagePropsType = {
	error: string;
};

const ErrorMessage = ({ error }: ErrorMessagePropsType) => {
	return (
		<p className="text-center text-[#e70909] font-montserrat font-bold text-base border-2 border-[#e70909] p-4 w-2/4 m-auto">
			{error}
		</p>
	);
};

export default ErrorMessage;
