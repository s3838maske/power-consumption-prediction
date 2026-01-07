# 🚀 QUICK START GUIDE

## Power Consumption Prediction Application

---

## 📋 Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.9+
- **MongoDB** 4.4+
- **Git**

---

## 🎯 FRONTEND SETUP (5 minutes)

### 1. Install Dependencies

```bash
cd power-consumption-prediction
npm install
```

### 2. Configure Environment

Create `.env` file:

```env
VITE_API_URL=http://localhost:8000/api
VITE_ENV=development
```

### 3. Run Development Server

```bash
npm run dev
```

Application runs on: **http://localhost:5173**

### 4. Build for Production

```bash
npm run build
npm run preview
```

---

## 🐍 BACKEND SETUP (10 minutes)

### 1. Create Virtual Environment

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

Create `backend/.env`:

```env
SECRET_KEY=your-django-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

MONGODB_NAME=power_consumption_db
MONGODB_HOST=localhost
MONGODB_PORT=27017

JWT_SECRET_KEY=your-jwt-secret
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 4. Setup MongoDB

```bash
# Start MongoDB service
mongod --dbpath /path/to/data

# Or use MongoDB Atlas (cloud)
# Update MONGODB_HOST in .env
```

### 5. Run Migrations

```bash
python manage.py migrate
python manage.py createsuperuser
```

### 6. Train ML Models

```bash
python ml_models/train_models.py
```

### 7. Run Django Server

```bash
python manage.py runserver
```

Backend runs on: **http://localhost:8000**

---

## 🎨 FEATURES OVERVIEW

### **User Dashboard**

- 📊 4 stat cards (Total, Average, Peak, Predicted)
- 📈 Pie chart (Device-wise consumption)
- 📉 Line chart (Daily trends)
- 📊 Bar chart (Actual vs Predicted)

### **Data Upload**

- 📁 Excel file upload (.xlsx, .xls)
- ✅ Real-time validation
- 👁️ Data preview (first 5 rows)
- 📊 Progress tracking

### **Admin Panel**

- 👥 User management (CRUD)
- 📱 Device management
- 🏷️ Category management
- 📈 System analytics

---

## 🧪 TESTING

### Frontend

```bash
npm run lint
npm run build
```

### Backend

```bash
python manage.py test
```

---

## 📊 SAMPLE DATA FORMAT

Excel file should have these columns:

| date       | device          | consumption |
| ---------- | --------------- | ----------- |
| 2024-01-01 | Air Conditioner | 45.5        |
| 2024-01-01 | Refrigerator    | 12.3        |
| 2024-01-02 | Washing Machine | 8.7         |

---

## 🔐 DEFAULT CREDENTIALS

### User Login

- Email: `user@example.com`
- Password: `User@123`

### Admin Login

- Email: `admin@example.com`
- Password: `Admin@123`

_(Create these users via Django admin or registration)_

---

## 🌐 API ENDPOINTS

### Authentication

- `POST /api/auth/register/` - Register user
- `POST /api/auth/login/` - User login
- `POST /api/auth/admin-login/` - Admin login

### User

- `POST /api/user/upload-data/` - Upload Excel
- `GET /api/user/dashboard-stats/` - Dashboard data
- `GET /api/user/predictions/` - Get predictions

### Admin

- `GET /api/admin/users/` - List users
- `POST /api/admin/users/` - Create user
- `GET /api/admin/analytics/` - System analytics

---

## 🐛 TROUBLESHOOTING

### Frontend Issues

**Port already in use:**

```bash
# Change port in vite.config.js
server: { port: 3000 }
```

**Module not found:**

```bash
rm -rf node_modules package-lock.json
npm install
```

### Backend Issues

**MongoDB connection error:**

```bash
# Check MongoDB is running
mongod --version

# Check connection string in .env
```

**Import errors:**

```bash
pip install --upgrade -r requirements.txt
```

---

## 📱 RESPONSIVE DESIGN

- ✅ Mobile (< 600px)
- ✅ Tablet (600px - 960px)
- ✅ Desktop (> 960px)

---

## 🎯 NEXT FEATURES TO IMPLEMENT

1. **Predictions Page** - Detailed prediction view
2. **Reports Page** - PDF/Excel download
3. **Alerts Page** - Real-time notifications
4. **Category Management** - Admin CRUD
5. **Device Management** - Admin CRUD
6. **Email Alerts** - Spike notifications
7. **LSTM Model** - Advanced predictions

---

## 📚 DOCUMENTATION

- `README.md` - Project overview
- `PROJECT_SUMMARY.md` - Implementation details
- `backend/README.md` - Backend setup
- `AUTH_STRUCTURE.md` - Authentication flow

---

## 🤝 SUPPORT

For issues or questions:

1. Check documentation
2. Review error logs
3. Check browser console (F12)
4. Check Django logs

---

## ✅ VERIFICATION CHECKLIST

### Frontend

- [ ] `npm install` successful
- [ ] `npm run dev` starts server
- [ ] Can access http://localhost:5173
- [ ] Login page loads
- [ ] No console errors

### Backend

- [ ] Virtual environment activated
- [ ] Dependencies installed
- [ ] MongoDB running
- [ ] Migrations applied
- [ ] Server starts on port 8000

### Integration

- [ ] Frontend can call backend APIs
- [ ] JWT authentication works
- [ ] CORS configured correctly
- [ ] Data flows between frontend/backend

---

**🎉 You're all set! Happy coding!**
