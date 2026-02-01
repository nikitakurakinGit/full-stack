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
                            block py-2 px-3 rounded font-medium
                            transition-colors duration-200
                            ${
                            isActive
                                ? "bg-blue-600 text-white"
                                : "text-[#0c0e0e] hover:text-blue-600"
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
                            block py-2 px-3 rounded font-medium
                            transition-colors duration-200
                            ${
                            isActive
                                ? "bg-blue-600 text-white"
                                : "text-[#0c0e0e] hover:bg-gray-200 hover:text-blue-600"
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
                            block py-2 px-3 rounded font-medium
                            transition-colors duration-200
                            ${
                            isActive
                                ? "bg-blue-600 text-white"
                                : "text-[#0c0e0e] hover:bg-gray-200 hover:text-blue-600"
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