import Link from 'next/link';
import React from 'react';

const Logo = () => {
    return (
        <Link href={"/"}>
            <h1 className="bg-linear-65 from-[#C2FF97] to-[#7BFD00] text-transparent bg-clip-text font-bold text-xl md:text-2xl">Next Gen Edu</h1>
        </Link>
    );
};

export default Logo;