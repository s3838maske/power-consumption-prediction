# Django Backend for Power Consumption Prediction

## Setup Instructions

### 1. Create Virtual Environment

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Environment Variables

Create `.env` file in backend directory:

```
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# MongoDB
MONGODB_NAME=power_consumption_db
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_USER=
MONGODB_PASSWORD=

# JWT
JWT_SECRET_KEY=your-jwt-secret-key
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=30
JWT_REFRESH_TOKEN_EXPIRE_DAYS=7

# Email (for alerts)
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

### 4. Run Migrations

```bash
python manage.py migrate
```

### 5. Create Superuser

```bash
python manage.py createsuperuser
```

### 6. Run Server

```bash
python manage.py runserver
```

## Project Structure

```
backend/
├── manage.py
├── requirements.txt
├── .env
├── config/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── apps/
│   ├── authentication/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── users/
│   ├── devices/
│   ├── categories/
│   ├── consumption/
│   ├── predictions/
│   ├── alerts/
│   └── reports/
└── ml_models/
    ├── linear_regression_model.pkl
    ├── random_forest_model.pkl
    └── train_models.py
```

## API Documentation

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register/
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Login

```http
POST /api/auth/login/
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response:
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "_id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "role": "user"
}
```

### User Endpoints

#### Upload Data

```http
POST /api/user/upload-data/
Authorization: Bearer {token}
Content-Type: multipart/form-data

file: consumption_data.xlsx
```

#### Get Dashboard Stats

```http
GET /api/user/dashboard-stats/
Authorization: Bearer {token}

Response:
{
  "totalConsumption": 1500.5,
  "avgDailyConsumption": 50.2,
  "peakConsumption": 85.3,
  "predictedNextMonth": 1600.0,
  "deviceBreakdown": [...],
  "dailyData": [...],
  "weeklyData": [...]
}
```

## Database Schema (MongoDB)

### Users Collection

```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['user', 'admin']),
  status: String (enum: ['active', 'inactive']),
  createdAt: Date,
  updatedAt: Date
}
```

### ConsumptionData Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  deviceId: ObjectId (ref: Devices),
  date: Date,
  consumption: Number (kWh),
  category: String,
  location: String,
  notes: String,
  createdAt: Date
}
```

### Devices Collection

```javascript
{
  _id: ObjectId,
  name: String,
  categoryId: ObjectId (ref: Categories),
  userId: ObjectId (ref: Users),
  ratedPower: Number (watts),
  avgUsageHours: Number,
  status: String,
  createdAt: Date
}
```

### Predictions Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  type: String (enum: ['daily', 'weekly', 'monthly']),
  predictedValue: Number,
  actualValue: Number,
  accuracy: Number,
  modelUsed: String,
  timestamp: Date
}
```

### Alerts Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  type: String (enum: ['spike', 'threshold', 'anomaly']),
  message: String,
  severity: String (enum: ['low', 'medium', 'high']),
  read: Boolean,
  createdAt: Date
}
```

## ML Model Training

### Data Preprocessing

1. Handle missing values
2. Normalize consumption data
3. Feature engineering (day of week, month, season)
4. Split train/test data (80/20)

### Models

1. **Linear Regression**: Baseline model
2. **Random Forest**: Better accuracy for non-linear patterns
3. **LSTM** (Future): For time-series prediction

### Training Script

```bash
python ml_models/train_models.py
```

## Deployment

### Production Checklist

- [ ] Set DEBUG=False
- [ ] Configure ALLOWED_HOSTS
- [ ] Setup production MongoDB
- [ ] Configure CORS settings
- [ ] Setup SSL/HTTPS
- [ ] Configure static files
- [ ] Setup logging
- [ ] Configure email backend
- [ ] Setup monitoring

### Docker Deployment

```bash
docker-compose up -d
```
