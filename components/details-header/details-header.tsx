import React from 'react';
import Image from 'next/image';

//* components
import DetailsTitle from '../details-title/details-title';

//* images
import user_default from '../../public/user_profile.png';

type DetailsImageProps = {
	contentType: 'album' | 'artist' | 'track' | 'user';
	image: string;
	title: string;
	error: string | null;
	subtitle?: SpotifyApi.ArtistObjectSimplified[] | string;
	detail?: string;
};

const DetailsHeader = ({
	contentType,
	image,
	title,
	error,
	subtitle,
	detail,
}: DetailsImageProps) => {
	return (
		<div
			className={`flex flex-col justify-center sm:flex-row sm:justify-start items-center p-5 relative overflow-hidden backdrop-contrast-150 shadow-2xl shadow-black font-montserrat ${
				contentType === 'track' ? 'h-screen' : ''
			} `}
		>
			{error ? (
				<p className="text-center text-[#e70909] font-montserrat font-bold text-base border-2 border-[#e70909] p-4 w-2/4 m-auto z-50">
					{error}
				</p>
			) : null}

			{image && (
				<img
					className="object-cover absolute h-full w-full z-0 grayscale blur-2xl brightness-25"
					src={image}
					alt={title}
				/>
			)}

			{!error ? (
				image ? (
					<Image src={image} alt={title} width="160%" height="160%" />
				) : (
					<Image
						src={user_default}
						alt="user profile"
						width="110%"
						height="110%"
					/>
				)
			) : null}

			{!error && (
				<DetailsTitle
					contentType={contentType}
					title={title}
					subtitle={subtitle ? subtitle : null}
					detail={detail ? detail : null}
				/>
			)}
		</div>
	);
};

export default React.memo(DetailsHeader);
