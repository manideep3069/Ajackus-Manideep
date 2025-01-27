# User Management Dashboard [Deployed Link](https://azackus-manideep.netlify.app/)

A modern, responsive web application designed for managing users. It allows users to view, add, edit, and delete user details in an intuitive and interactive dashboard interface.

## Features

### Core Functionalities
1. **View Users**:
   - Displays a list of users with details such as ID, First Name, Last Name, Email, and Department.
   - Integrated with pagination for seamless navigation of large datasets.

2. **Add Users**:
   - Users can add new entries via a modal form.
   - Added rows are highlighted with a green blinking effect for better visibility.

3. **Edit Users**:
   - Edit user details through a pre-filled modal form.
   - Edited rows are highlighted with a yellow blinking effect for user feedback.

4. **Delete Users**:
   - Provides a confirmation prompt before deletion.
   - Rows marked for deletion blink in red for brief periods before being removed.

### Additional Features
- **Pagination Navigation**:
   - Includes clickable page numbers for easy navigation.
   - Dynamically adapts to the number of pages in the dataset.

- **Form Validation**:
   - Ensures all input fields are filled and email addresses are valid.
   - Displays inline error messages or alerts for invalid inputs.

- **Animations and Feedback**:
   - Smooth transitions and row highlighting improve the user experience.
   - Hover effects and responsive feedback enhance interactivity.

- **Error Handling**:
   - Gracefully handles API errors and displays user-friendly error messages.

- **Responsive Design**:
   - Fully optimized for desktop and mobile devices.

## Technologies Used

### Frontend
- **React.js**: Functional components and hooks for dynamic rendering.
- **Axios**: For handling HTTP requests.
- **CSS**: Used for animations, transitions, and styling.

### Backend (Mock)
- **JSONPlaceholder API**: A free online REST API for demonstration purposes.

## Getting Started

### Prerequisites
- Node.js and npm installed on your system.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/manideep3069/Ajackus-Manideep.git
   cd Ajackus-Manideep
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
1. Start the development server:
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`.

2. Build for production:
   ```bash
   npm run build
   ```
   The build artifacts will be stored in the `build/` directory.

### Deployment
- Deploy the app on platforms like **Netlify**, **Vercel**, or **GitHub Pages**.

## Project Structure
```
project-root/
├── public/
│   └── index.html  # Main HTML file
├── src/
│   ├── components/ # Reusable components
│   ├── styles/     # CSS stylesheets
│   ├── App.js      # Main app component
│   └── index.js    # Entry point
├── package.json    # Dependencies and scripts
└── README.md       # Project documentation
```

## Future Enhancements
1. **Real Backend Integration**:
   - Replace JSONPlaceholder with a real backend service for persistent data storage.

2. **Advanced Search and Filter**:
   - Add features to search and filter users by various criteria (e.g., name, department).

3. **Role-Based Access Control**:
   - Implement different roles for users (e.g., admin, editor).

4. **Unit and Integration Testing**:
   - Use Jest and Cypress to ensure reliable functionality.

5. **Dynamic Data Schema**:
   - Allow configuration of columns and fields dynamically based on a provided schema.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

## License
This project is licensed under the MIT License.

## Contact
For questions or feedback, feel free to contact:
- **Author**: Maruthi Manideep Gorla
- **Email**: maruthimanideepgorla@gmail.com
- **GitHub**: [manideep3069](https://github.com/manideep3069)

---
Thank you for exploring this project! Happy coding! 🚀
