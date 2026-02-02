import { NavLink } from "react-router-dom";

export default function Nav() {
    return(
        <nav>
            <ul className="flex gap-5">
                <li>
                    <NavLink 
                        to="coaches"
                        className={({ isActive }) =>
                            `
                            block py-2 px-3 text-white text-lg rounded font-medium
                            transition-colors duration-200
                            ${
                            isActive
                                ? "bg-[#bcc8d0] text-black"
                                : "text-[#0c0e0e] hover:text-gray-400"
                            }
                            `
                        }
                    >
                        Coaches
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="athletes"
                        className={({ isActive }) =>
                             `
                            block py-2 px-3 text-white text-lg rounded font-medium
                            transition-colors duration-200
                            ${
                            isActive
                                ? "bg-[#bcc8d0] text-black"
                                : "text-[#0c0e0e] hover:text-gray-400"
                            }
                            `
                        }
                    >
                        Athletes
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="workouts"
                        className={({ isActive }) =>
                             `
                            block py-2 px-3 text-white text-lg rounded font-medium
                            transition-colors duration-200
                            ${
                            isActive
                                ? "bg-[#bcc8d0] text-black"
                                : "text-[#0c0e0e] hover:text-gray-400"
                            }
                            `
                        }
                    >
                        Workouts
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}