import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Button from "../../components/button";
import bgImage from "../../assets/leaf-bg.png";
const Homepage = () => {
    return (_jsxs("div", { style: {
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }, className: "h-[100vh] flex flex-col", children: [_jsx("div", { className: "overlay absolute top-0 left-0 w-full h-full bg-black opacity-50" }), _jsx("div", { className: "above-overlay absolute top-0 left-0 w-full h-full z-10 flex flex-col justify-between", children: _jsxs("div", { className: "md:max-w-4xl p-4 md:p-0 flex flex-col flex-grow mx-auto justify-center items-center", children: [_jsx("h1", { className: "md:text-4xl text-3xl text-white my-8", children: "Leaf Identification System" }), _jsx("div", { className: "flex flex-col justify-center items-center flex-grow", children: _jsxs("p", { className: "text-white md:text-2xl text-xl", children: [_jsx("strong", { className: "md:text-4xl text-3xl", children: "Welcome" }), " to our leaf identification system. This tool is designed to help you easily identify plants based on their leaves. Simply upload an image of a leaf, and our advanced algorithms will analyze its unique features to provide accurate results"] }) }), _jsxs("div", { className: "flex md:flex-row flex-col gap-3 justify-between items-center w-full mb-8", children: [_jsx(Button, { href: "/upload", children: "Identify Leaf" }), _jsx(Button, { children: "Learn More" }), _jsx(Button, { children: "About Us" })] })] }) })] }));
};
export default Homepage;
