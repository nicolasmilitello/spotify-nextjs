import Link from 'next/link';

// types
type TrackPropsType = {
	id: string;
	trackNumber: number;
	image: string;
	name: string;
	album?: {
		name: string;
		id: string;
	};
	artists?: SpotifyApi.ArtistObjectSimplified[];
};

const Track = ({
	id,
	trackNumber,
	image,
	name,
	album,
	artists,
}: TrackPropsType) => {
	return (
		<Link href={`/track/${id}`}>
			<div className="grid grid-cols-2 cursor-pointer text-gray-500 py-4 md:py-1 px-5 hover:bg-[#2b2b2b] font-montserrat">
				<div className="flex items-center space-x-4">
					<p className="text-sm">{trackNumber}</p>

					<img className="h-10 w-10" src={image} alt={name} />

					<div>
						<p className="w-36 lg:w-64 text-white text-sm font-semibold">
							{name}
						</p>

						{artists &&
							artists.map((artist) => (
								<Link
									key={artist.id}
									href={`/artist/${artist.id}`}
								>
									<p className="w-40 text-xs hover:text-[#bdbdbd] italic">
										{artist.name}
									</p>
								</Link>
							))}

						{!artists && album && (
							<Link href={`/album/${album.id}`}>
								<p className="w-40 text-xs hover:text-[#bdbdbd] italic">
									{album.name}
								</p>
							</Link>
						)}
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Track;
