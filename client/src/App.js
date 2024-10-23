import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Upload from "./pages/upload";
const App = () => {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Homepage, {}) }), _jsx(Route, { path: "/upload", element: _jsx(Upload, {}) })] }) }));
};
export default App;
