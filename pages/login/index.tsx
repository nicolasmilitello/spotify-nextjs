import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';
import { InferGetServerSidePropsType } from 'next/types';

// types
type LoginPageProps = {
	providers: InferGetServerSidePropsType<typeof getServerSideProps>;
};

const Login = ({ providers }: LoginPageProps) => {
	return (
		<div className='flex flex-col items-center bg-[#1ed760] min-h-screen w-full justify-center'>
			<img
				className='w-2/4 mb-5'
				src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png'
				alt='Spotify logo'
			/>
			{providers &&
				(
					Object.values(providers) as unknown as ClientSafeProvider[]
				).map((provider) => (
					<div key={provider.name}>
						<button
							className='bg-[#000000] text-[#f7f3cd] p-3 rounded-full hover:bg-[#1aa34a]'
							onClick={() =>
								signIn(provider.id, { callbackUrl: '/' })
							}
						>{`Login with ${provider.name}`}</button>
					</div>
				))}
		</div>
	);
};

export default Login;

export async function getServerSideProps() {
	const providers = await getProviders();

	return {
		props: {
			providers,
		},
	};
}
