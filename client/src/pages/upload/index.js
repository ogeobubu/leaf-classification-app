import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Button from "../../components/button";
import bgImage from "../../assets/leaf-bg.png";
const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await axios.post(`/api/images/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [classificationResult, setClassificationResult] = useState(null);
    const { mutate } = useMutation({
        mutationFn: uploadImage,
        onSuccess: (data) => {
            setClassificationResult(data);
            setModalVisible(true);
        },
        onError: (error) => {
            console.error("Upload error:", error);
        },
    });
    const handleFiles = useCallback((files) => {
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        }
    }, []);
    const handleUpload = () => {
        if (selectedFile) {
            mutate(selectedFile);
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    const handleDrop = (e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };
    return (_jsxs("div", { style: {
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }, className: "h-[100vh]", children: [_jsx("div", { className: "overlay absolute top-0 left-0 w-full h-full bg-black opacity-50" }), _jsx("div", { className: "above-overlay absolute top-0 left-0 w-full h-full z-10", children: _jsxs("div", { className: "flex flex-col justify-center items-center p-4 md:max-w-4xl m-auto h-[100%]", children: [_jsx(Button, { href: "/", className: "absolute top-3 left-3", children: "Go Back" }), _jsxs("div", { className: "dropzone flex flex-col justify-center items-center border-4 border-dashed border-green-500 rounded-lg h-96 w-full md:w-[580px] bg-white shadow-md mt-16 md:mt-0", onDragOver: handleDragOver, onDrop: handleDrop, children: [_jsx("input", { type: "file", id: "fileElem", multiple: true, accept: "image/*", onChange: (e) => handleFiles(e.target.files), className: "hidden" }), _jsxs("label", { htmlFor: "fileElem", className: "flex flex-col justify-center items-center h-full cursor-pointer", children: [_jsx("span", { className: "text-gray-400 mb-2 text-center", children: "Drag and drop your image here or click to upload" }), _jsx("span", { className: "text-gray-300", children: "Only images are allowed" })] }), selectedFile && (_jsx("div", { className: "mt-2 text-gray-600", children: `Selected file: ${selectedFile.name}` }))] }), _jsx(Button, { onClick: handleUpload, 
                            // disabled={!selectedFile || isLoading}
                            className: "mt-4", children: "Upload Image" }), _jsx("p", { className: "mt-6 text-white text-center", children: "File must be JPEG, JPG or PNG and up to 40MB" })] }) }), modalVisible && classificationResult && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-75", role: "dialog", "aria-labelledby": "modal-title", "aria-modal": "true", onKeyDown: (e) => e.key === "Escape" && setModalVisible(false), children: _jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto", children: [_jsx("h2", { id: "modal-title", className: "text-lg font-bold mb-4", children: "Leaf Classification Result" }), _jsx("img", { src: `${classificationResult.leaf.imageUrl}`, alt: "Leaf", className: "mb-2 w-full h-auto rounded" }), _jsx("p", { className: "mb-2", children: _jsx("strong", { children: "Features:" }) }), _jsxs("ul", { className: "list-disc list-inside mb-4", children: [_jsxs("li", { children: ["Length: ", classificationResult.leaf.features.length] }), _jsxs("li", { children: ["Width: ", classificationResult.leaf.features.width] }), _jsxs("li", { children: ["Color: ", classificationResult.leaf.features.color] })] }), _jsx("button", { onClick: () => setModalVisible(false), className: "bg-red-500 text-white px-8 py-2 rounded-md", children: "Close" })] }) }))] }));
};
export default ImageUpload;
