import React from 'react';

//* components
import Layout from '../../components/layout/layout';
import ErrorMessage from '../../components/error-message/error-message';

const index = () => {
	return (
		<Layout>
			<div className='bg-[#181818] p-5 h-screen flex items-center justify-center'>
				<ErrorMessage error='Sorry, this page does not exist.' />
			</div>
		</Layout>
	);
};

export default index;
