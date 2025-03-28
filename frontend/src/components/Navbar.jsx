import { useState } from "react";
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
	const { user, logout } = useUserStore();
	const { cart } = useCartStore();
	const [isOpen, setIsOpen] = useState(false);
	const isAdmin = user?.role === "admin";

	return (
		<header className='fixed top-0 left-0 w-full bg-gray-950 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800'>
			<div className='container mx-auto px-4 py-3 flex justify-between items-center'>

				{/* Logo */}
				<Link to='/' className='text-2xl font-bold text-white flex items-center space-x-2'>
					Tee-Clothing
				</Link>

				{/* Mobile Menu Button */}
				<button 
					className='text-white md:hidden' 
					onClick={() => setIsOpen(!isOpen)}
					aria-label="Toggle menu"
				>
					{isOpen ? <X size={28} /> : <Menu size={28} />}
				</button>

				{/* Navbar Links (Hidden on Mobile) */}
				<nav className={`absolute md:static top-16 left-0 w-full md:w-auto bg-gray-950 md:bg-transparent 
					md:flex items-center gap-4 p-4 md:p-0 border-t border-emerald-800 md:border-0 
					${isOpen ? "block" : "hidden"} transition-all duration-300`}
				>
					{user && (
						<Link
							to={"/cart"}
							className='relative group text-white hover:text-emerald-400 transition duration-300 ease-in-out flex items-center'
							aria-label="View cart"
							onClick={() => setIsOpen(false)}
						>
							<ShoppingCart size={20} />
							<span className='ml-2'>Cart</span>
							{cart.length > 0 && (
								<span className='absolute -top-2 -right-3 bg-emerald-500 text-black rounded-full px-2 py-0.5 text-xs'>
									{cart.length}
								</span>
							)}
						</Link>
					)}

					{isAdmin && (
						<Link
							className='bg-black hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium flex items-center transition duration-300 ease-in-out'
							to={"/secret-dashboard"}
							aria-label="Admin Dashboard"
							onClick={() => setIsOpen(false)}
						>
							<Lock size={18} className='mr-2' />
							<span>Dashboard</span>
						</Link>
					)}

					{user ? (
						<button
							className='bg-black hover:bg-emerald-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out w-full md:w-auto'
							onClick={async () => {
								await logout();
								setIsOpen(false);
							}}
							aria-label="Logout"
						>
							<LogOut size={18} />
							<span className='ml-2'>Log Out</span>
						</button>
					) : (
						<>
							<Link
								to={"/signup"}
								className='bg-black hover:bg-emerald-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out w-full md:w-auto'
								aria-label="Sign up"
								onClick={() => setIsOpen(false)}
							>
								<UserPlus size={18} className='mr-2' />
								Sign Up
							</Link>
							<Link
								to={"/login"}
								className='bg-black hover:bg-emerald-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out w-full md:w-auto'
								aria-label="Login"
								onClick={() => setIsOpen(false)}
							>
								<LogIn size={18} className='mr-2' />
								Login
							</Link>
						</>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
