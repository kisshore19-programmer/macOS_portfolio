import React from 'react'
import dayjs from 'dayjs';
import { navIcons, navLinks } from '#constants/index.js';
const Navbar = () => {
    return (
        <nav>
            <div>
                <img src="/images/logo.svg" alt="logo" />
                <p className="font-bold">Kisshore's Portfolio</p>

                <ul>
                    {navLinks.map(({ id, name }) => (
                        <li key={id}>
                            <p>{name}</p>
                        </li>
                    ))}

                </ul>
            </div>
            <div>
                <ul>
                    {navIcons.map(({ id, img }) => (
                        <li key={id}>
                            <img src={img} className="icon-hover" alt={'icon-${id}'} />
                        </li>
                    ))}
                </ul>
                <time>
                    {dayjs().format('ddd DD MMM h:mm A')}
                </time>
            </div>
        </nav>
    )
}

export default Navbar;