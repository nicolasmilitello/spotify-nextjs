import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

//* context
import { SpotifyAppProvider } from '../context/context';

function MyApp({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps<{
	session: Session;
}>) {
	return (
		<SessionProvider session={session}>
			<SpotifyAppProvider>
				<Component {...pageProps} />
			</SpotifyAppProvider>
		</SessionProvider>
	);
}

export default MyApp;
