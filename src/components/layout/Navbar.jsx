
import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, Info, Image as Images, UserCircle } from 'lucide-react';
import { ProfileContext } from '@/context/ProfileContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { profileImageUrl } = useContext(ProfileContext);

  const navLinkClasses = ({ isActive }) =>
    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:text-primary hover:bg-primary/10 ${
      isActive ? 'nav-link-active' : 'text-cyber-muted'
    }`;

  return (
    <motion.nav
      className="sticky top-0 z-40 w-full bg-cyber-bg/80 backdrop-blur-md border-b border-cyber-border/30 shadow-lg shadow-black/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <Bot className="h-8 w-8 text-primary group-hover:animate-pulse cyber-glow-primary transition-all duration-300" />
              <span className="ml-2 text-xl font-bold text-glow-primary group-hover:text-primary transition-colors">
                FashionAI
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/about" className={navLinkClasses}>
              <Info className="h-4 w-4 mr-1" /> About Us
            </NavLink>
            <NavLink to="/my-pics" className={navLinkClasses}>
              <Images className="h-4 w-4 mr-1" /> My Pics
            </NavLink>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cyber-bg focus:ring-secondary rounded-full">
                  <Avatar className="h-8 w-8 border-2 border-secondary/50 hover:border-secondary transition-colors cyber-glow-secondary">
                    <AvatarImage src={profileImageUrl} alt="User profile" />
                    <AvatarFallback className="bg-secondary/20 text-secondary">
                      <UserCircle size={18} />
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-4 bg-cyber-surface border-cyber-border text-cyber-text">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-cyber-border/50" />
                <DropdownMenuItem asChild>
                   <Link to="/account" className="cursor-pointer flex items-center">
                     <UserCircle className="mr-2 h-4 w-4" />
                     <span>Profile Settings</span>
                   </Link>
                </DropdownMenuItem>
                {/* Add more items like Logout later */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
           {/* Mobile Menu Button Placeholder */}
           <div className="md:hidden flex items-center">
              {/* Implement mobile menu toggle here later */}
              <button className="p-2 rounded-md text-cyber-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                 {/* Hamburger Icon */}
                 <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                 </svg>
              </button>
           </div>
        </div>
      </div>
       {/* Mobile Menu Panel Placeholder */}
       {/* <div className="md:hidden"> ... </div> */}
    </motion.nav>
  );
};

export default Navbar;
  