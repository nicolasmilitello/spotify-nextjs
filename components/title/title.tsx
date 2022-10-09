// types
type TitlePropsType = {
	title: string;
};

const Title = ({ title }: TitlePropsType) => {
	return (
		<div className="p-5 bg-black">
			<p className="text-white text-center text-3xl font-bold">
				{title.toUpperCase()}
			</p>
		</div>
	);
};

export default Title;
