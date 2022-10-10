import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

//* context
import { SpotifyAppContext } from '../../context/context';

//* components
import Modal from '../modal/modal';

//* hooks
import useSpotify from '../../hooks/use-spotify';

//* toastify styles
import 'react-toastify/dist/ReactToastify.css';

// types
type SaveButtonPropsType = {
	resourceType: 'album' | 'track';
};

const SaveButton = ({ resourceType }: SaveButtonPropsType) => {
	const spotifyApi = useSpotify();

	spotifyApi.addToMySavedAlbums;

	const [saved, setSaved] = useState(false);

	const { albumPageState, trackPageState } = useContext(SpotifyAppContext);

	const [resourceId, setResourceId] = useState('');

	const [loading, setLoading] = useState(true);

	const [showModal, setShowModal] = useState(false);

	const handleSave = async () => {
		setLoading(true);

		try {
			if (spotifyApi.getAccessToken()) {
				if (resourceType === 'track') {
					if (saved) {
						setShowModal(false);
						const response =
							await spotifyApi.removeFromMySavedTracks([
								resourceId,
							]);

						if (
							response.statusCode >= 200 &&
							response.statusCode < 300
						) {
							setSaved(false);

							toast.success('Track removed from your library', {
								position: 'top-right',
								autoClose: 5000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
							});
						} else {
							console.error(response.body);

							toast.error('Something went wrong. Try again.', {
								position: 'top-right',
								autoClose: 5000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
							});
						}
						return;
					}

					const response = await spotifyApi.addToMySavedTracks([
						resourceId,
					]);

					if (
						response.statusCode >= 200 &&
						response.statusCode < 300
					) {
						setSaved(true);
						toast.success('Track added to your library', {
							position: 'top-right',
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						});
					} else {
						console.error(response.body);
						toast.error('Something went wrong. Try again.', {
							position: 'top-right',
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						});
					}
					return;
				}

				if (resourceType === 'album') {
					if (saved) {
						setShowModal(false);
						const response =
							await spotifyApi.removeFromMySavedAlbums([
								resourceId,
							]);

						if (
							response.statusCode >= 200 &&
							response.statusCode < 300
						) {
							setSaved(false);
							toast.success('Album removed from your library', {
								position: 'top-right',
								autoClose: 5000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
							});
						} else {
							console.error(response.body);
							toast.error('Something went wrong. Try again.', {
								position: 'top-right',
								autoClose: 5000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
							});
						}
						return;
					}

					const response = await spotifyApi.addToMySavedAlbums([
						resourceId,
					]);

					if (
						response.statusCode >= 200 &&
						response.statusCode < 300
					) {
						setSaved(true);
						toast.success('Album added to your library', {
							position: 'top-right',
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						});
					} else {
						console.error(response.body);
						toast.error('Something went wrong. Try again.', {
							position: 'top-right',
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						});
					}
				}
			}
		} catch (error) {
			console.error(error);

			toast.error('Something went wrong. Try again.', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (resourceType === 'album') {
			setResourceId(albumPageState.singleAlbum.information.id);
		} else if (resourceType === 'track') {
			setResourceId(trackPageState.singleTrack.information.id);
		}

		const checkIfSaved = async () => {
			try {
				if (spotifyApi.getAccessToken()) {
					if (resourceType === 'album') {
						const response = await spotifyApi.containsMySavedAlbums(
							[resourceId]
						);

						if (
							response.statusCode >= 200 &&
							response.statusCode < 300
						) {
							setSaved(response.body[0]);
						}
					}

					if (resourceType === 'track') {
						const response = await spotifyApi.containsMySavedTracks(
							[resourceId]
						);

						if (
							response.statusCode >= 200 &&
							response.statusCode < 300
						) {
							setSaved(response.body[0]);
						}
					}
				}
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		if (resourceId) {
			checkIfSaved();
		}
	}, [
		resourceId,
		albumPageState.singleAlbum.information.id,
		trackPageState.singleTrack.information.id,
	]);

	return (
		<div className="relative">
			{!showModal && (
				<button
					className={`text-xs md:text-xs lg:text-xs sm:ml-10 text-bold text-[#bdbdbd] mt-3 italic text-center sm:text-left w-16 ${
						loading
							? 'bg-[#505050]'
							: saved
							? 'bg-[#c00000]'
							: 'bg-[#0d6901]'
					} hover:bg-white hover:text-black transition-all duration-500`}
					onClick={
						saved ? () => setShowModal(true) : () => handleSave()
					}
				>
					{loading ? (
						<p className="text-center">Loading...</p>
					) : (
						<p className="text-center">
							{saved ? 'Remove' : 'Save'}
						</p>
					)}
				</button>
			)}

			{showModal && (
				<Modal
					message={`Are you sure you want to remove this ${resourceType} from your library?`}
					yesAction={() => handleSave()}
					noAction={() => setShowModal(false)}
				/>
			)}
		</div>
	);
};

export default SaveButton;
