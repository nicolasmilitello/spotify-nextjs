import React from 'react';
import { useRef } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

//* hooks
import { useToggle } from '../../hooks/use-toggle';

const NavBar = () => {
	const navRef = useRef<HTMLDivElement>(null);

	const [isOpen, setIsOpen] = useToggle();

	if (isOpen) {
		navRef.current?.classList.add('transform-none');
	} else {
		navRef.current?.classList.remove('transform-none');
	}

	return (
		<div className="relative font-montserrat">
			<div>
				<Link href="/">
					<img
						src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
						alt="marvel logo"
						className="w-2/6 sm:w-2/12 m-auto my-1 cursor-pointer"
					/>
				</Link>
				<button
					className="absolute top-1 right-5 text-2xl visible md:invisible"
					onClick={setIsOpen}
				>
					☰
				</button>
			</div>

			<nav
				className="fixed top-0 left-0 h-full w-full flex flex-col items-center justify-center gap-6 transition duration-1000 transform -translate-y-full md:transform-none md:tranlate-none z-50 md:relative md:flex-row md:justify-evenly bg-[#1aa34a] uppercase tracking-tighter font-semibold"
				ref={navRef}
			>
				<Link href="/">
					<span
						className="hover:bg-white p-3 transition-all duration-500 cursor-pointer"
						onClick={setIsOpen}
					>
						Home
					</span>
				</Link>

				<Link href="/search">
					<span
						className="hover:bg-white p-3 transition-all duration-500 cursor-pointer"
						onClick={setIsOpen}
					>
						Search
					</span>
				</Link>

				<Link href="/user">
					<span
						className="hover:bg-white p-3 transition-all duration-500 cursor-pointer"
						onClick={setIsOpen}
					>
						My account
					</span>
				</Link>

				<Link href="/yourlibrary">
					<span
						className="hover:bg-white p-3 transition-all duration-500 cursor-pointer"
						onClick={setIsOpen}
					>
						Your library
					</span>
				</Link>

				<span
					className="hover:bg-white p-3 transition-all duration-500 cursor-pointer"
					onClick={() => signOut()}
				>
					Log out
				</span>

				<button className="inline md:hidden">
					<span
						className="hover:bg-white p-3 transition-all duration-500 cursor-pointer absolute top-2 right-2 text-2xl"
						onClick={setIsOpen}
					>
						X
					</span>
				</button>
			</nav>
		</div>
	);
};

export default React.memo(NavBar);
