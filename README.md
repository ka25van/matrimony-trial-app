
# Kodava Matrimony Application

A full-stack web application for Kodava matrimony, built using **Python (Flask)** for the backend and **React** for the frontend. The application includes user registration, login, profile search by location, and map integration using Leaflet for displaying profiles on a map. The project is designed to be scalable and runs on Windows.

## Features

- **User Registration**: Allows users to register by entering their Name, Email, Place, Password, and Gender.
- **User Login**: Verifies the user's login credentials. If not registered, it redirects them to the registration page.
- **Profile Search by Location**: Users can search profiles based on location, and the results are displayed on a map.
- **Map Integration**: The map shows profiles in specific locations with markers that can be clicked to show profile details.
- **Profile Editing**: Users can edit their profile details after registration.

## Technology Stack

- **Frontend**: React.js, Axios, React-Leaflet (for maps)
- **Backend**: Flask (Python), Flask-CORS, PyMongo (MongoDB)
- **Database**: MongoDB Atlas
- **Map**: Leaflet with OpenStreetMap Tiles

## Setup and Installation

### Prerequisites

- Python 3.x
- Node.js and npm
- MongoDB Atlas (cloud database)
- Flask, Flask-CORS, PyMongo installed via `pip`
- React.js

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/kodava-matrimony.git
   cd kodava-matrimony
   ```

2. **Backend Setup**:
   - Navigate to the `backend` folder:
     ```bash
     cd backend
     ```
   - Install Python dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Edit the `app.py` file to add your MongoDB Atlas credentials.
   - Run the Flask backend:
     ```bash
     python app.py
     ```

3. **Frontend Setup**:
   - Navigate to the `frontend` folder:
     ```bash
     cd ../frontend
     ```
   - Install the npm dependencies:
     ```bash
     npm install
     ```
   - Run the React frontend:
     ```bash
     npm start
     ```

4. **Access the Application**:
   - The frontend will be running on `http://localhost:3000` and the backend on `http://localhost:5000`.

## File Structure and Description

### Backend (`/backend` folder)

- **app.py**: 
  - The main Flask application that handles user registration, login, and search requests.
  - Includes API routes for:
    - `/register`: Registers users and stores them in the MongoDB database.
    - `/login`: Verifies user login credentials.
    - `/home/search`: Searches for profiles based on the provided location and returns matching profiles.
  - Utilizes `PyMongo` to connect to MongoDB Atlas, with CORS enabled via `Flask-CORS`.

- **requirements.txt**: 
  - Lists the Python dependencies required for the project (e.g., Flask, PyMongo, Flask-CORS).

### Frontend (`/frontend` folder)

- **src/App.js**: 
  - The root React component that sets up the routing for the application using `react-router-dom`.
  - Defines routes for the Registration, Login, Home, and Profile components.

- **src/components/Register.js**: 
  - Contains the registration form where users input their details (Name, Email, Place, Password, Gender).
  - Sends the registration data to the backend for storing in the database.

- **src/components/Login.js**: 
  - A login form that takes in the user's Email and Password.
  - On login, it sends a request to the backend for verification.
  - If the login fails, it redirects the user to the Registration page.

- **src/components/Home.js**: 
  - The home page where users can search profiles by place.
  - An input field allows users to enter a place, and clicking the Search button fetches matching profiles from the backend.
  - Uses Leaflet to display the results on a map, with markers showing profile locations.

- **src/components/MapComponent.js**: 
  - A separate React component that displays the Leaflet map.
  - Takes `profiles` as a prop and places markers on the map based on the latitude and longitude from the database.

### Database

- The MongoDB Atlas database contains user profile information such as Name, Email, Place, Password (hashed), Gender, and location coordinates (latitude and longitude).

## How It Works

1. **User Registration**:
   - Users fill out a registration form and submit their details.
   - The backend hashes the password and stores the user details in the MongoDB Atlas database.
   
2. **User Login**:
   - On the login page, the user enters their Email and Password.
   - The backend checks the credentials against the stored details in the MongoDB database. If valid, the user is redirected to the Home page.

3. **Profile Search**:
   - On the Home page, users enter a place to search profiles.
   - The backend queries the MongoDB database for profiles in that place and returns the data, including latitude and longitude.
   - The frontend displays the results on a Leaflet map with clickable markers.

4. **Map Integration**:
   - The `react-leaflet` library is used to display a map.
   - Markers representing profiles are shown on the map based on the latitude and longitude provided by the backend.

## License

This project is licensed under the MIT License.
