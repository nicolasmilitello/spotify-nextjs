import React from "react";

const ContentSeparator = () => {
	return (
		<div className="flex justify-center py-5 items-center w-full">
			<div className="border-t border-gray-400 w-2/4"></div>
		</div>
	);
};

export default React.memo(ContentSeparator);
