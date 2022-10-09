//* components
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import Navbar from '../navbar/navbar';

//* types
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<div>
			<Head>
				<title>Applaudo Studios Final Project</title>
			</Head>

			<Navbar />
			{children}
			<ToastContainer />
		</div>
	);
};

export default Layout;
