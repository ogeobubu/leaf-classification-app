import React, { useCallback, useState } from "react";
import axios from "axios";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import Button from "../../components/button";
import bgImage from "../../assets/leaf-bg.png";
import { LeafResponse } from "../../typings";

const uploadImage = async (file: File): Promise<LeafResponse> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post(`/api/images/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

const ImageUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [classificationResult, setClassificationResult] = useState<LeafResponse | null>(null);

  const { mutate, isLoading } = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      console.log("Upload success:", data);
      setClassificationResult(data);
      setModalVisible(true);
    },
    onError: (error) => {
      console.error("Upload error:", error);
    },
  });

  const handleFiles = useCallback((files: FileList | null) => {
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  }, []);

  const handleUpload = () => {
    if (selectedFile) {
      mutation.mutate(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="h-[100vh]"
    >
      <div className="overlay absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="above-overlay absolute top-0 left-0 w-full h-full z-10">
        <div className="flex flex-col justify-center items-center p-4 md:max-w-4xl m-auto h-[100%]">
          <Button href="/" className="absolute top-3 left-3">
            Go Back
          </Button>
          <div
            className="dropzone flex flex-col justify-center items-center border-4 border-dashed border-green-500 rounded-lg h-96 w-full md:w-[580px] bg-white shadow-md mt-16 md:mt-0"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="fileElem"
              multiple
              accept="image/*"
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
            />
            <label
              htmlFor="fileElem"
              className="flex flex-col justify-center items-center h-full cursor-pointer"
            >
              <span className="text-gray-400 mb-2 text-center">
                Drag and drop your image here or click to upload
              </span>
              <span className="text-gray-300">Only images are allowed</span>
            </label>
            {selectedFile && (
              <div className="mt-2 text-gray-600">{`Selected file: ${selectedFile.name}`}</div>
            )}
          </div>
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || mutation.isLoading}
            className="mt-4"
          >
            Upload Image
          </Button>
          {mutation.isLoading && (
            <p className="mt-2 text-blue-500">Uploading...</p>
          )}
          {mutation.isError && (
            <p className="mt-2 text-red-500">Error uploading image.</p>
          )}
          {mutation.isSuccess && (
            <p className="mt-2 text-green-500">Upload successful!</p>
          )}
          <p className="mt-6 text-white text-center">
            File must be JPEG, JPG or PNG and up to 40MB
          </p>
        </div>
      </div>

      {modalVisible && classificationResult && (
        <div
          className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-75"
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
          onKeyDown={(e) => e.key === "Escape" && setModalVisible(false)}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <h2 id="modal-title" className="text-lg font-bold mb-4">
              Leaf Classification Result
            </h2>

            <img
              src={`${classificationResult.leaf.imageUrl}`}
              alt="Leaf"
              className="mb-2 w-full h-auto rounded"
            />

            <p className="mb-2">
              <strong>Features:</strong>
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Length: {classificationResult.leaf.features.length}</li>
              <li>Width: {classificationResult.leaf.features.width}</li>
              <li>Color: {classificationResult.leaf.features.color}</li>
            </ul>

            <button
              onClick={() => setModalVisible(false)}
              className="bg-red-500 text-white px-8 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;