//* components
import WrapperLinkCard from '../wrapper-link-card/wrapper-link-card';
import Image from 'next/image';

//* images
import artist_album_default from '../../public/artist_album_default.png';

// type
type CardPropsType = {
	pathToRedirect: 'album' | 'artist' | undefined;
	externalUrlToRedirect: string | undefined;
	image: string;
	name: string;
	id: string;
	cardsFormat: 'circle' | 'square';
};

const Card = ({
	cardsFormat,
	pathToRedirect,
	externalUrlToRedirect,
	image,
	name,
	id,
}: CardPropsType) => {
	return (
		<WrapperLinkCard
			internalLink={
				pathToRedirect && !externalUrlToRedirect
					? `/${pathToRedirect}/${id}`
					: undefined
			}
			externalLink={
				externalUrlToRedirect && !pathToRedirect
					? externalUrlToRedirect
					: undefined
			}
		>
			<div
				className={`group relative transition-all cursor-pointer ${
					cardsFormat === 'circle'
						? 'rounded-full overflow-hidden w-40 h-40 m-auto'
						: ''
				}`}
			>
				{
					image ? (
						<img
							className="group-hover:opacity-5 duration-300"
							src={image}
							alt={name}
						/>
					) : (
						<div className="group-hover:opacity-5 duration-300">
						<Image src={artist_album_default} alt={name} width="200%" height="200%" />
						</div>
					)
				}
				
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 invisible md:group-hover:visible">
					<p className="text-center font-semibold text-xs md:text-sm">
						{name}
					</p>
				</div>

				<div className="bg-[#000000af] transition-all duration-300 absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 visible md:invisible group-hover:bg-transparent w-full p-1">
					<p className="truncate text-center font-semibold text-xs sm:whitespace-normal md:text-sm">
						{name}
					</p>
				</div>
			</div>
		</WrapperLinkCard>
	);
};

export default Card;
