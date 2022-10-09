// types
type ModalPropsType = {
	yesAction: () => void;
	noAction: () => void;
	message: string;
};

const Modal = ({ yesAction, noAction, message }: ModalPropsType) => {
	return (
		<div className="fixed z-990 inset-0 bg-black opacity-95 h-full flex flex-col justify-center items-center">
			<div>
				<p className="text-sm md:text-base lg:text-base sm:ml-10 text-bold text-[#bdbdbd] italic text-center sm:text-left">
					{message}
				</p>
			</div>

			<div className="font-bold mt-5">
				<button
					className="text-[#c00000] p-2 border border-[#c00000] mr-2 hover:bg-[#c00000] hover:text-white transition-all duration-500"
					onClick={yesAction}
				>
					YES
				</button>
				<button
					className="text-[#0d6901] p-2 border border-[#0d6901] ml-2 hover:bg-[#0d6901] hover:text-white transition-all duration-500"
					onClick={noAction}
				>
					NO
				</button>
			</div>
		</div>
	);
};

export default Modal;
