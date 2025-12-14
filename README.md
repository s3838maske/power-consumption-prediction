# ⚡ Power Consumption Prediction

A modern web application for predicting and analyzing power consumption patterns, built with React and Material-UI.

## 🚀 Features

- **User Authentication System**

  - Secure login and registration
  - Form validation with real-time feedback
  - Password strength requirements
  - Responsive authentication UI with Material-UI

- **Modern Tech Stack**
  - React 19.2.0 with Vite for lightning-fast development
  - Material-UI (MUI) for beautiful, accessible components
  - React Router DOM for seamless navigation
  - ESLint for code quality

## 📁 Project Structure

```
power-consumption-prediction/
├── src/
│   ├── App.jsx                      # Main app with theme & routing
│   ├── main.jsx                     # Application entry point
│   ├── index.css                    # Global styles
│   │
│   ├── components/
│   │   └── common/                  # Reusable UI components
│   │       ├── Button.jsx
│   │       └── TextField.jsx
│   │
│   ├── containers/                  # Business logic containers
│   │   ├── LoginContainer.jsx
│   │   └── RegistrationContainer.jsx
│   │
│   ├── pages/                       # Page components
│   │   └── Auth/
│   │       ├── LoginPage.jsx
│   │       └── RegistrationPage.jsx
│   │
│   ├── routes/                      # Route configuration
│   │   └── AppRoutes.jsx
│   │
│   ├── helpers/                     # Utility functions
│   ├── hooks/                       # Custom React hooks
│   └── theme/                       # MUI theme customization
│
├── public/                          # Static assets
├── AUTH_STRUCTURE.md               # Detailed auth system docs
└── package.json
```

## 🛠️ Tech Stack

### Core

- **React** 19.2.0 - UI library
- **Vite** 7.2.4 - Build tool & dev server
- **React Router DOM** 7.10.1 - Client-side routing

### UI Framework

- **Material-UI (MUI)** 7.3.6 - Component library
- **@mui/icons-material** 7.3.6 - Icon library
- **@emotion/react** & **@emotion/styled** - CSS-in-JS styling

### Development Tools

- **ESLint** 9.39.1 - Code linting
- **@vitejs/plugin-react** 5.1.1 - React support for Vite

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/s3838maske/power-consumption-prediction.git
   cd power-consumption-prediction
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

## 🎯 Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build production-ready bundle            |
| `npm run preview` | Preview production build locally         |
| `npm run lint`    | Run ESLint to check code quality         |

## 🔐 Authentication System

The application includes a complete authentication system with:

### Login Features

- Email and password validation
- Password visibility toggle
- Error handling and display
- "Forgot Password" link
- Responsive design

### Registration Features

- Multi-field form (First Name, Last Name, Email, Password)
- Real-time validation
- Password strength requirements:
  - Minimum 6 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
- Password confirmation matching
- Success/error notifications

### Routes

- `/` - Redirects to login
- `/login` - User login page
- `/register` - User registration page

For detailed authentication documentation, see [AUTH_STRUCTURE.md](./AUTH_STRUCTURE.md)

## 🎨 Design Philosophy

- **Material Design** - Following Google's Material Design principles
- **Responsive** - Mobile-first, works on all screen sizes
- **Accessible** - WCAG compliant components from MUI
- **Modern UI** - Gradient backgrounds, smooth animations
- **User-Friendly** - Clear error messages and loading states

## 🔧 Configuration

### Vite Configuration

The project uses Vite for fast development and optimized builds. Configuration can be found in `vite.config.js`.

### ESLint Configuration

Code quality rules are defined in `eslint.config.js` with React-specific plugins.

## 📚 Component Architecture

The project follows a clean architecture pattern:

- **Pages** - Route-level components, minimal logic
- **Containers** - Business logic, state management, API calls
- **Components** - Reusable UI components, presentational only

This separation ensures:

- ✅ Easy testing
- ✅ Code reusability
- ✅ Clear separation of concerns
- ✅ Better maintainability

## 🚧 Roadmap

- [ ] Backend API integration
- [ ] Power consumption prediction model
- [ ] Data visualization dashboard
- [ ] Historical data analysis
- [ ] Export reports (PDF/CSV)
- [ ] User profile management
- [ ] Admin panel
- [ ] Real-time monitoring

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

**Shubham Maske**

- GitHub: [@s3838maske](https://github.com/s3838maske)

## 🙏 Acknowledgments

- [React](https://react.dev/) - The library for web and native user interfaces
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Material-UI](https://mui.com/) - React component library
- [React Router](https://reactrouter.com/) - Declarative routing for React

---

**Built with ❤️ using React + Vite + Material-UI**
