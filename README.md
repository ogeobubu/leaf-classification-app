# Leaf Classification API

This project is a Node.js TypeScript application that allows users to upload images of leaves, extract specific features, compare them with known species data, and store the information in a MongoDB database. The API can be extended to support more species and advanced image processing techniques.

## Features

- **Image Upload**: Users can upload leaf images via a REST API.
- **Feature Extraction**: The system extracts basic features (length, width, color) from the uploaded image.
- **Comparison**: Extracted features are compared against predefined known species to identify the leaf.
- **Result Storage**: The species and feature data are stored in MongoDB.
- **Result Retrieval**: Retrieve stored data including species information from the database.

## Tech Stack

- **Node.js**: JavaScript runtime used to build the backend server.
- **TypeScript**: Adds static typing to JavaScript to help catch errors early.
- **MongoDB**: NoSQL database to store leaf data.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.
- **Multer**: Middleware for handling `multipart/form-data`, used for image uploads.
- **Sharp**: A high-performance image processing library to extract image metadata like dimensions.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **dotenv**: For managing environment variables.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v12.x or higher)
- [MongoDB](https://www.mongodb.com/) (You can use a local instance or a cloud instance like MongoDB Atlas)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/leaf-classification-api.git
   cd leaf-classification-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```bash
   MONGO_URI=mongodb://localhost:27017/leaf-classification
   PORT=5000
   ```

4. Ensure MongoDB is running on your machine or update the `MONGO_URI` to match your MongoDB setup.

### Running the Application

To start the server in development mode, use the following command:

```bash
npx ts-node-dev src/server.ts
```

This will compile TypeScript and start the server on the specified port (default: `5000`).

### Running Backend and Frontend Servers

To run both the backend and frontend servers using Nodemon, follow these steps:

1. **Install Nodemon** (if not already included in your project):
   ```bash
   npm install --save-dev nodemon
   ```

2. **Configure Scripts**: Update your `package.json` to include scripts for running the backend and frontend servers concurrently. Here’s an example:

   ```json
   "scripts": {
       "server": "cd src && nodemon --exec ts-node server.ts",
       "client": "cd client && yarn run dev",
       "dev": "concurrently \"npm run server\" \"npm run client\""
   }
   ```

   Adjust the `client` script as necessary based on your frontend setup.

3. **Run Both Servers**: Use the following command to start both servers:
   ```bash
   npm run dev
   ```

   This command will run the backend server and the frontend application simultaneously, allowing them to communicate seamlessly.

### Connecting the Backend with the Frontend

1. **Set Up Axios or Fetch**: Use a library like Axios or the Fetch API to make HTTP requests from your frontend to the backend API. Ensure you install Axios if you choose to use it:

   ```bash
   npm install axios
   ```

2. **Make API Calls**: In your frontend component, import Axios and make API calls to the backend. Here’s a simple example of how to upload an image:

   ```javascript
   import axios from 'axios';

   const uploadImage = async (file) => {
       const formData = new FormData();
       formData.append('image', file);

       try {
           const response = await axios.post('http://localhost:5000/api/images/upload', formData, {
               headers: {
                   'Content-Type': 'multipart/form-data',
               },
           });
           console.log(response.data);
       } catch (error) {
           console.error('Error uploading image:', error);
       }
   };
   ```

3. **CORS Configuration**: If your frontend and backend are running on different ports (e.g., frontend on `3000` and backend on `5000`), ensure you handle CORS (Cross-Origin Resource Sharing) in your Express server:

   ```javascript
   import cors from 'cors';

   const app = express();
   app.use(cors());
   ```

### API Endpoints

#### 1. **Upload Image**

- **Endpoint**: `POST /api/images/upload`
- **Description**: Uploads an image of a leaf, extracts features, compares with known species, and stores the result in MongoDB.
- **Request**: `multipart/form-data` with an `image` file.
- **Response**:
  ```json
  {
      "message": "Image uploaded successfully",
      "leaf": {
          "_id": "60e4f8ef5d9b2c1f88cfeab3",
          "species": "Oak",
          "image": "example.jpg",
          "features": {
              "length": 10,
              "width": 5,
              "color": "Green"
          },
          "__v": 0
      }
  }
  ```

#### 2. **Get All Leaves**

- **Endpoint**: `GET /api/leaves`
- **Description**: Retrieve all leaves stored in the MongoDB database.
- **Response**:
  ```json
  [
      {
          "_id": "60e4f8ef5d9b2c1f88cfeab3",
          "species": "Oak",
          "image": "example.jpg",
          "features": {
              "length": 10,
              "width": 5,
              "color": "Green"
          },
          "__v": 0
      }
  ]
  ```

### Folder Structure

```
root/
│
├── src/
│   ├── controllers/
│   │   └── imageController.ts       # Handles image processing logic
│   ├── models/
│   │   └── Leaf.ts                  # Mongoose model for Leaf data
│   ├── routes/
│   │   └── imageRoutes.ts           # Routes for image upload and data access
│   ├── utils/
│   │   └── fileUtils.ts             # Utility functions for file management
│   ├── app.ts                       # Express app configuration
│   ├── server.ts                    # Entry point to start the server
│   └── config/
│       └── db.ts                    # MongoDB connection configuration
├── uploads/                         # Directory to store uploaded images
├── .env                             # Environment variables
├── package.json                     # Project dependencies
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # Project documentation
```

### How It Works

1. **Image Upload**: A user uploads a leaf image via a POST request to the `/upload` endpoint.
2. **Feature Extraction**: The image is processed using the Sharp library to extract its dimensions (length and width). Color is currently hardcoded as an example.
3. **Comparison**: The extracted features are compared to predefined known species data stored in memory.
4. **Species Identification**: If a match is found between the uploaded image's features and a known species, that species is associated with the image. Otherwise, it is marked as "Unknown".
5. **Data Storage**: The image, species, and extracted features are stored in MongoDB for future reference.
6. **Result Retrieval**: Users can retrieve stored leaf data via a GET request.

### Example Workflow

1. A user uploads an image of a leaf (e.g., an Oak leaf).
2. The API extracts the leaf's length, width, and color from the image.
3. It compares the extracted features with known species data (Oak, Maple, Pine, etc.).
4. If the features match a known species (e.g., Oak), the leaf is classified as "Oak" and saved to the database.
5. The user can retrieve the classified leaf data from the database using the provided endpoints.

### Future Improvements

- **Advanced Feature Extraction**: Use machine learning or advanced image processing to extract more detailed features (e.g., vein patterns, texture).
- **Dynamic Species Data**: Instead of hardcoding species data, store the species information in MongoDB for scalability.
- **User Authentication**: Add user accounts and authentication to restrict access to certain API features.
- **Pagination**: Implement pagination for large data sets when retrieving multiple records.

### Known Issues

- The color extraction logic is currently hardcoded. You may need a more sophisticated approach for real-world use cases.
- The species data is predefined in memory. This should eventually be moved to a database for flexibility.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Contributors

- **Oge Obubu** - _Initial work_ - [GitHub](https://github.com/ogeobubu)

### Project Information

```json
{
  "name": "leaf-classification-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "server": "cd src && nodemon --exec ts-node server.ts",
    "client": "cd client && yarn run dev",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@types/express": "^4.17.21",
    "@types/mongoose": "^5.11.97",
    "@types/multer": "^1.4.12",
    "@types/node-cron": "^3.0.11",
    "@types/sharp": "^0.32.0",
    "@types/swagger-ui-express": "^4.1.6",
    "dotenv": "^16.4.5",
    "express": "^4.21.0",
    "mongoose": "^8.6.3",
    "multer": "^1.4.5-lts.1",
    "node-cron": "^3.0.3",
    "sharp": "^0.33.5",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.1",
    "ts-node": "^10.9.2",
    "typescript": "^5.6.2"
  },
  "devDependencies": {
    "concurrently": "^9.0.1",
    "nodemon": "^3.1.7"
  }
}
```