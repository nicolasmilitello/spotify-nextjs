import Link from 'next/link';

//* components
import SaveButton from '../save-button/save-button';

// types
type DetailsTitle = {
	contentType: 'artist' | 'album' | 'track' | 'user';
	title: string;
	subtitle: SpotifyApi.ArtistObjectSimplified[] | string | null;
	detail: string | null;
};

const DetailsTitle = ({
	contentType,
	title,
	subtitle,
	detail,
}: DetailsTitle) => {
	return (
		<div className="z-20">
			<h2 className="text-4xl sm:text-5xl text-white mt-5 sm:mt-0 sm:ml-10 font-bold text-center sm:text-left">
				{title}
			</h2>

			<h5 className="text-l md:text-l lg:text-l sm:ml-10 text-white mt-3 italic text-center sm:text-left">
				{typeof subtitle === 'string' ? (
					<p className="mr-2">{subtitle}</p>
				) : (
					subtitle?.map((artist) => (
						<span key={artist.id}>
							<Link href={`/artist/${artist.id}`}>
								<span className="hover:text-[#bdbdbd] cursor-pointer mr-2">
									{artist.name}
								</span>
							</Link>
						</span>
					))
				)}
			</h5>

			<h6 className="text-xs md:text-xs lg:text-xs sm:ml-10 text-[#bdbdbd] mt-3 italic text-center sm:text-left">
				{detail}
			</h6>

			{(contentType === 'album' || contentType === 'track') && (
				<div className="flex justify-center sm:inline">
					<SaveButton resourceType={contentType} />
				</div>
			)}

			{contentType === 'user' && (
				<div className="text-center sm:ml-10 sm:text-left">
					<Link href="/yourlibrary">
						<button>
							<p className="transition-all bg-black text-xs font-bold text-[#bdbdbd] text-center sm:text-left p-2 mt-3 hover:bg-white hover:text-black duration-500">
								YOUR LIBRARY
							</p>
						</button>
					</Link>
				</div>
			)}
		</div>
	);
};

export default DetailsTitle;
