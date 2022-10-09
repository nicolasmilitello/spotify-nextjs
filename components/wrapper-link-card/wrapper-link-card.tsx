import Link from 'next/link';

// types
type WrapperLinkCardPropsType = {
	children: React.ReactNode;
	internalLink: string | undefined;
	externalLink: string | undefined;
};

const WrapperLinkCard = ({
	children,
	internalLink,
	externalLink,
}: WrapperLinkCardPropsType) => {
	if (internalLink) {
		return <Link href={internalLink}>{children}</Link>;
	} else {
		return (
			<a href={externalLink} target="_blank">
				{children}
			</a>
		);
	}
};

export default WrapperLinkCard;
