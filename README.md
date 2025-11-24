# Bulk Mailer Frontend

A modern React-based frontend application for sending bulk emails through a REST API. Built with Vite, Ant Design, and Firebase authentication.

## Features

-   **User Authentication**: Firebase-based user registration and login
-   **Bulk Email Interface**: User-friendly form for composing and sending bulk emails
-   **Real-time Progress**: Live progress tracking during email sending
-   **Email Validation**: Client-side and server-side email validation
-   **Responsive Design**: Mobile-friendly interface using Ant Design
-   **Error Handling**: Comprehensive error handling with toast notifications
-   **CSV Support**: Upload recipient lists via CSV or manual entry
-   **Gmail Integration**: Seamless integration with Gmail SMTP via backend API

## Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn
-   Backend API server running (see backend README)

## Installation

1. Clone the repository and navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the frontend directory with Firebase configuration:
    ```env
    VITE_BACKEND_URL=http://localhost:8000
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
    VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
    ```

## Configuration

### Environment Variables

-   `VITE_BACKEND_URL`: Backend API URL (default: http://localhost:8000)
-   `VITE_FIREBASE_*`: Firebase configuration variables for authentication

### Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Authentication with Email/Password provider
3. Get your Firebase config from Project Settings → General → Your apps
4. Add the config values to your `.env` file

## Development

### Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5174`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Project Structure

```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── AppPasswordGuide.jsx      # Gmail App Password setup guide
│   │   ├── CreateUser.jsx            # User registration form
│   │   ├── EmailBodyExampleModal.jsx # Email template examples
│   │   ├── ForgotPassword.jsx        # Password reset form
│   │   ├── Login.jsx                 # User login form
│   │   ├── MailForm.jsx              # Main email sending form
│   │   ├── Navbar.jsx                # Navigation component
│   │   └── ProgressPanel.jsx         # Email sending progress display
│   ├── pages/
│   │   ├── AuthPage.jsx              # Authentication page
│   │   └── HomePage.jsx              # Main application page
│   ├── utils/
│   │   ├── api.js                    # API utility functions
│   │   └── firebaseConfig.js         # Firebase configuration
│   ├── App.jsx                       # Main App component
│   ├── index.css                     # Global styles
│   └── main.jsx                      # Application entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Features Overview

### Authentication

-   **User Registration**: Create new accounts with email and password
-   **Login**: Secure login with existing credentials
-   **Password Reset**: Forgot password functionality
-   **Protected Routes**: Authenticated users only access to email sending features

### Email Sending

-   **Sender Configuration**: Gmail email and App Password input
-   **Email Composition**: Subject and HTML body composition
-   **Recipient Management**:
    -   Manual entry (comma-separated or newline-separated)
    -   CSV upload support
-   **From Name**: Custom sender display name
-   **Concurrency Control**: Adjustable sending concurrency

### Progress Tracking

-   **Real-time Updates**: Live progress during sending
-   **Success/Failure Counts**: Summary statistics
-   **Individual Results**: Detailed results for each recipient
-   **Error Messages**: User-friendly error descriptions

### User Experience

-   **Toast Notifications**: Success and error messages
-   **Form Validation**: Client-side validation with helpful error messages
-   **Responsive Design**: Works on desktop and mobile devices
-   **Loading States**: Visual feedback during operations
-   **Modal Dialogs**: Help guides and additional information

## API Integration

The frontend communicates with the backend API through the following endpoints:

-   `POST /send`: Send bulk emails
-   Authentication handled via Firebase (no direct API calls)

### API Response Handling

-   **Success**: Displays summary and detailed results
-   **Authentication Errors**: Shows "Username and Password not accepted"
-   **Validation Errors**: Highlights invalid fields
-   **Network Errors**: Displays connection issues
-   **Server Errors**: Shows generic error messages

## Styling

-   **Tailwind CSS**: Utility-first CSS framework
-   **Ant Design**: Component library for consistent UI
-   **Custom Styles**: Additional styling in `index.css`

## Browser Support

-   Chrome (recommended)
-   Firefox
-   Safari
-   Edge

## Troubleshooting

### Common Issues

1. **Firebase Configuration**

    - Ensure all Firebase environment variables are set correctly
    - Check Firebase project settings match your config

2. **Backend Connection**

    - Verify `VITE_BACKEND_URL` points to running backend server
    - Check CORS settings if requests are blocked

3. **Email Sending Issues**

    - Confirm Gmail App Password is correct
    - Ensure 2FA is enabled on Gmail account
    - Check email limits and sending restrictions

4. **Build Issues**
    - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
    - Check Node.js version compatibility

### Development Tips

-   Use browser developer tools to inspect network requests
-   Check console for error messages during development
-   Firebase authentication state changes are logged in console

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC License
