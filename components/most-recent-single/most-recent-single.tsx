import Link from 'next/link';

// types
type MostRecentSinglePropsType = {
	image: string;
	lastAlbum: {
		name: string;
		image: string;
		id: string;
		artistName: string;
	};
	error: string | null;
};

const MostRecentSingle = ({
	image,
	lastAlbum,
	error,
}: MostRecentSinglePropsType) => {
	return (
		<>
			{error ? (
				<div className="hidden md:flex flex-col justify-center items-center group my-5 md:mr-5 border-solid border-2 border-white shadow-xl shadow-white relative">
					<img
						className="object-cover absolute h-full w-full z-0 grayscale blur-lg brightness-50"
						src={image}
						alt={lastAlbum.name}
					/>

					<p className="text-center text-[#e46b6b] font-montserrat font-bold text-base border-2 border-[#e70909] p-4 w-2/4 m-auto z-20 bg-[#e7090931]">
						{error}
					</p>
				</div>
			) : lastAlbum.id ? (
				<Link href={`/album/${lastAlbum.id}`}>
					<div className="hidden md:flex flex-col justify-center items-center group my-5 md:mr-5 border-solid border-2 border-white shadow-xl shadow-white relative cursor-pointer">
						<img
							className="object-cover absolute h-full w-full z-0 grayscale blur-lg brightness-50"
							src={image}
							alt={lastAlbum.name}
						/>

						<div className="bg-black m-5 p-2 z-20 transition-all group-hover:scale-110 duration-1000">
							<img
								className="w-60"
								src={lastAlbum.image}
								alt="artist"
							/>
						</div>

						<div className="text-center m-10 z-20">
							<p className="text-sm uppercase text-white tracking-normal [text-shadow:_0_1px_20px_rgb(170_170_170_/_100%)] font-semibold transition-all group-hover:tracking-widest duration-1000">
								Latest album released by <br />
								<span className="text-lg [text-shadow:_0_1px_20px_rgb(255_255_255_/_100%)] font-bold">{`${lastAlbum.artistName}`}</span>
							</p>
							<p className="text-2xl uppercase text-white tracking-normal [text-shadow:_0_1px_20px_rgb(255_255_255_/_100%)] font-bold transition-all group-hover:tracking-wide duration-1000">
								{lastAlbum.name}
							</p>
						</div>
					</div>
				</Link>
			) : (
				<div className="hidden md:flex flex-col justify-center items-center group my-5 md:mr-5 border-solid border-2 border-white shadow-xl shadow-white relative cursor-default">
					<img
						className="object-cover absolute h-full w-full z-0 grayscale blur-lg brightness-50"
						src={image}
						alt={lastAlbum.name}
					/>

					<div className="text-center m-10 z-20">
						<p className="text-2xl uppercase text-white tracking-normal [text-shadow:_0_1px_20px_rgb(255_255_255_/_100%)] font-bold transition-all group-hover:tracking-wide duration-1000">
							{lastAlbum.artistName} has not released any album at
							the moment.
						</p>
					</div>
				</div>
			)}
		</>
	);
};

export default MostRecentSingle;
