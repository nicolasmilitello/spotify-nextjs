const Loading = () => {
	return (
		<div className="flex justify-center items-center m-5">
			<div className="relative w-14 h-14 animate-spin rounded-full bg-gradient-to-r from-[#1ed760] via-[#00491a] to-[#181818] ">
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#181818] rounded-full border-2 border-[#181818]"></div>
			</div>
		</div>
	);
};

export default Loading;
