# ⚡ Power Consumption Prediction - Full-Stack Application

## 🎯 Project Overview

A production-ready Power Consumption Prediction Web Application built with **React.js**, **Material-UI**, **Highcharts**, **Django REST Framework**, and **MongoDB**. This application helps households, offices, and industries track electricity usage, predict future consumption, and receive personalized energy-saving recommendations.

---

## 🏗️ Architecture

### **Frontend**

- **React.js** 19.2.0 - Modern UI library
- **Material-UI (MUI)** 7.3.6 - Complete UI component library
- **Highcharts** - Professional charting library (Pie, Line, Bar charts)
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client with interceptors
- **XLSX** - Excel file processing
- **jsPDF** - PDF generation

### **Backend** (To be implemented)

- **Django** + **Django REST Framework**
- **JWT Authentication**
- **MongoDB** with Djongo/PyMongo
- **Python ML** (Pandas, NumPy, Scikit-learn)
- **Models**: Linear Regression, Random Forest

---

## 📁 Project Structure

```
power-consumption-prediction/
├── src/
│   ├── components/
│   │   ├── charts/              # Highcharts components
│   │   │   ├── PieChart.jsx     # Device-wise consumption
│   │   │   ├── LineChart.jsx    # Trend analysis
│   │   │   └── BarChart.jsx     # Actual vs Predicted
│   │   ├── common/              # Reusable MUI components
│   │   │   ├── Card.jsx
│   │   │   ├── Table.jsx
│   │   │   ├── Dialog.jsx
│   │   │   ├── Snackbar.jsx
│   │   │   └── Loading.jsx
│   │   └── layouts/             # Layout components
│   │       ├── UserLayout.jsx
│   │       └── AdminLayout.jsx
│   │
│   ├── containers/              # Business logic containers
│   │   ├── user/
│   │   │   ├── UserDashboardContainer.jsx
│   │   │   └── DataUploadContainer.jsx
│   │   └── admin/
│   │       ├── AdminDashboardContainer.jsx
│   │       └── UserManagementContainer.jsx
│   │
│   ├── pages/                   # Page components
│   │   ├── Auth/
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegistrationPage.jsx
│   │   ├── User/
│   │   │   ├── UserDashboardPage.jsx
│   │   │   ├── DataUploadPage.jsx
│   │   │   ├── PredictionsPage.jsx
│   │   │   ├── ReportsPage.jsx
│   │   │   └── AlertsPage.jsx
│   │   └── Admin/
│   │       ├── AdminDashboardPage.jsx
│   │       ├── UserManagementPage.jsx
│   │       ├── CategoryManagementPage.jsx
│   │       └── DeviceManagementPage.jsx
│   │
│   ├── store/                   # Redux state management
│   │   ├── index.js             # Store configuration
│   │   └── slices/
│   │       ├── authSlice.js     # Authentication state
│   │       ├── userSlice.js     # User data state
│   │       ├── adminSlice.js    # Admin state
│   │       ├── predictionSlice.js
│   │       └── alertSlice.js
│   │
│   ├── services/                # API services
│   │   └── api/
│   │       ├── apiClient.js     # Axios instance with interceptors
│   │       ├── authAPI.js       # Auth endpoints
│   │       ├── userAPI.js       # User endpoints
│   │       └── adminAPI.js      # Admin endpoints
│   │
│   ├── routes/                  # Routing configuration
│   │   └── AppRoutes.jsx        # Protected routes
│   │
│   ├── theme/                   # MUI theme customization
│   │   └── theme.js
│   │
│   ├── App.jsx                  # Root component
│   └── main.jsx                 # Entry point
│
├── backend/                     # Django backend (to be created)
│   ├── manage.py
│   ├── config/
│   ├── apps/
│   │   ├── authentication/
│   │   ├── users/
│   │   ├── devices/
│   │   ├── predictions/
│   │   └── reports/
│   └── ml_models/
│
└── package.json
```

---

## 🚀 Features Implemented

### ✅ **Frontend Core**

- [x] Redux Toolkit store with 5 slices
- [x] Axios API client with JWT interceptors
- [x] Custom MUI theme with modern design
- [x] Responsive layouts (User & Admin)
- [x] Protected routes with role-based access

### ✅ **Reusable Components**

- [x] **Charts**: PieChart, LineChart, BarChart (Highcharts)
- [x] **Common**: Card, Table, Dialog, Snackbar, Loading
- [x] All components use **MUI only** (no Bootstrap/Ant Design)

### ✅ **User Features**

- [x] **Dashboard**: Stats cards + 3 chart types
- [x] **Data Upload**: Excel validation, preview, progress tracking
- [x] Placeholder pages for Predictions, Reports, Alerts

### ✅ **Admin Features**

- [x] **Admin Dashboard**: System analytics, user growth chart
- [x] **User Management**: CRUD operations with search
- [x] Placeholder pages for Categories, Devices

### ✅ **Authentication**

- [x] Login/Registration pages (existing)
- [x] JWT token management in Redux
- [x] Role-based routing (user/admin)

---

## 📦 Installation & Setup

### **1. Clone Repository**

```bash
git clone https://github.com/s3838maske/power-consumption-prediction.git
cd power-consumption-prediction
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Environment Setup**

Create `.env` file:

```env
VITE_API_URL=http://localhost:8000/api
VITE_ENV=development
```

### **4. Run Development Server**

```bash
npm run dev
```

Application will run on `http://localhost:5173`

---

## 🎨 Design Highlights

### **Color Palette**

- **Primary**: #1976d2 (Blue)
- **Secondary**: #9c27b0 (Purple)
- **Gradients**: Modern gradient backgrounds on stat cards

### **Typography**

- **Font Family**: Inter, Roboto
- **Headings**: 600-700 weight
- **Buttons**: No text transform, 600 weight

### **Components**

- **Border Radius**: 8-12px
- **Shadows**: Subtle elevation shadows
- **Responsive**: Mobile-first design

---

## 🔐 Authentication Flow

1. **User Login** → JWT token stored in localStorage
2. **Role Detection** → Redirect to `/user/dashboard` or `/admin/dashboard`
3. **Protected Routes** → Automatic redirect if not authenticated
4. **Token Refresh** → Handled by Axios interceptors

---

## 📊 Charts Configuration

### **Pie Chart** (Device-wise Consumption)

```javascript
<PieChart
  data={[
    { name: "AC", value: 450 },
    { name: "Refrigerator", value: 200 },
  ]}
  title="Device-wise Energy Consumption"
/>
```

### **Line Chart** (Trend Analysis)

```javascript
<LineChart
  series={[{ name: "Daily Consumption", data: [120, 150, 180] }]}
  categories={["Mon", "Tue", "Wed"]}
  title="Daily Consumption Trend"
/>
```

### **Bar Chart** (Actual vs Predicted)

```javascript
<BarChart
  categories={["Week 1", "Week 2"]}
  actualData={[500, 520]}
  predictedData={[510, 530]}
/>
```

---

## 🔧 API Endpoints (Backend - To Be Implemented)

### **Authentication**

- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/admin-login/` - Admin login
- `GET /api/auth/me/` - Get current user

### **User**

- `POST /api/user/upload-data/` - Upload Excel file
- `GET /api/user/consumption-data/` - Get consumption data
- `GET /api/user/predictions/` - Get predictions
- `POST /api/user/predict/` - Request new prediction
- `GET /api/user/dashboard-stats/` - Dashboard statistics
- `POST /api/user/generate-report/` - Generate report

### **Admin**

- `GET /api/admin/users/` - List users
- `POST /api/admin/users/` - Create user
- `PUT /api/admin/users/:id/` - Update user
- `DELETE /api/admin/users/:id/` - Delete user
- `GET /api/admin/analytics/` - System analytics

---

## 🧪 Testing

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🚧 Next Steps (Backend Implementation)

### **Phase 1: Django Setup**

1. Create Django project
2. Setup MongoDB connection
3. Implement JWT authentication
4. Create User, Admin, Device, Category models

### **Phase 2: ML Integration**

1. Data preprocessing pipeline
2. Train Linear Regression model
3. Train Random Forest model
4. Create prediction API endpoint

### **Phase 3: Features**

1. Alert system (spike detection)
2. Report generation (PDF/Excel)
3. Recommendation engine
4. Email notifications

---

## 📚 Tech Stack Details

| Category     | Technology    | Version | Purpose             |
| ------------ | ------------- | ------- | ------------------- |
| **Frontend** | React         | 19.2.0  | UI Library          |
|              | Material-UI   | 7.3.6   | Component Library   |
|              | Highcharts    | Latest  | Charts              |
|              | Redux Toolkit | Latest  | State Management    |
|              | Axios         | Latest  | HTTP Client         |
|              | React Router  | 7.10.1  | Routing             |
| **Backend**  | Django        | TBD     | Web Framework       |
|              | DRF           | TBD     | REST API            |
|              | MongoDB       | TBD     | Database            |
| **ML**       | Scikit-learn  | TBD     | ML Models           |
|              | Pandas        | TBD     | Data Processing     |
|              | NumPy         | TBD     | Numerical Computing |

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is private and proprietary.

---

## 👨‍💻 Author

**Shubham Maske**

- GitHub: [@s3838maske](https://github.com/s3838maske)

---

## 🙏 Acknowledgments

- Material-UI for the excellent component library
- Highcharts for professional charting capabilities
- Redux Toolkit for simplified state management

---

**Built with ❤️ using React + MUI + Highcharts**
