import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
const Button = ({ children, className, href, onClick, disabled }) => {
    return (_jsx(_Fragment, { children: href ? (_jsx(Link, { to: href, children: _jsx("button", { className: `${className} bg-white cursor-pointer rounded-lg px-6 py-2 text-[#083708] hover:bg-white-400`, disabled: disabled, children: children }) })) : (_jsx("button", { onClick: onClick, disabled: disabled, className: `${className} bg-white cursor-pointer rounded-lg px-6 py-2 text-[#083708] hover:bg-white-400`, children: children })) }));
};
export default Button;
