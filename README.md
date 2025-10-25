# GroceTrack 🛒

A full-stack smart grocery management application that helps you track your groceries, manage expiry dates, monitor stock levels, and discover recipes based on available ingredients.

![GroceTrack](https://img.shields.io/badge/Status-Active-success)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![React](https://img.shields.io/badge/React-Frontend-blue)
![Node.js](https://img.shields.io/badge/Node.js-Backend-brightgreen)

## 🔗 Live Demo

- **Frontend**: [https://smart-grocery-tracker-gamma.vercel.app/](https://smart-grocery-tracker-gamma.vercel.app/)
- **Backend API**: [https://smart-grocery-tracker.onrender.com](https://smart-grocery-tracker.onrender.com)

> **Note**: The application may take a few seconds to load initially as the backend server spins up (free tier hosting).

## 🌟 Features

### 📊 Dashboard
- **Visual Analytics**: Interactive pie chart showing groceries distribution by category
- **Smart Alerts**: Real-time notifications for items expiring within 3 days
- **Low Stock Monitoring**: Automatic tracking of items with quantity ≤ 2
- **Statistics Cards**: Quick overview of total items, expiring items, and low stock items

### 🥬 Grocery Management
- **CRUD Operations**: Add, update, and delete grocery items with ease
- **Rich Categorization**: Organize items into fruits, vegetables, dairy, meat, pantry, frozen, and other
- **Flexible Units**: Support for multiple measurement units (pcs, kg, g, liters, ml, packs)
- **Expiry Tracking**: Set and monitor expiry dates for all items
- **Smart Filtering**: Search by name and filter by category
- **Visual Indicators**: Color-coded items based on expiry status and stock levels
- **Quantity Management**: Quick increment/decrement buttons for stock updates
- **Animated UI**: Smooth transitions using Framer Motion

### 👨‍🍳 Recipe Management
- **Personal Recipe Collection**: Save and manage your favorite recipes
- **Recipe Discovery**: Get AI-powered recipe suggestions based on your available groceries
- **Spoonacular Integration**: Access thousands of recipes from external API
- **Ingredient Matching**: See which ingredients you have and which you're missing
- **Image Support**: Add visual appeal with recipe images
- **Detailed Instructions**: Step-by-step cooking instructions
- **Quick Save**: Save API-suggested recipes to your personal collection

### ⚙️ User Settings
- **Profile Management**: Update name and email
- **Password Security**: Change password with current password verification
- **Real-time Updates**: Changes reflect immediately across the app

### 🔐 Authentication & Authorization
- **Secure Registration**: Email-based user registration with password hashing
- **JWT Authentication**: Token-based authentication with HTTP-only cookies
- **Protected Routes**: Client-side and server-side route protection
- **Persistent Sessions**: Stay logged in across browser sessions
- **Secure Logout**: Complete session cleanup

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1**: Latest React with modern hooks
- **Redux Toolkit 2.9.0**: State management
- **React Router DOM 7.9.1**: Client-side routing
- **Tailwind CSS 4.1.13**: Utility-first styling
- **Framer Motion 12.23.18**: Smooth animations
- **Recharts 3.2.1**: Data visualization
- **Axios 1.12.2**: HTTP client
- **React Hot Toast 2.6.0**: Toast notifications
- **Lucide React 0.544.0**: Modern icons
- **Vite 7.1.6**: Fast build tool

### Backend
- **Node.js**: JavaScript runtime
- **Express 5.1.0**: Web framework
- **MongoDB 6.19.0**: NoSQL database
- **Mongoose 8.18.1**: ODM for MongoDB
- **JWT 9.0.2**: JSON Web Tokens for auth
- **Bcrypt 6.0.0**: Password hashing
- **Cookie Parser 1.4.7**: Cookie handling
- **CORS 2.8.5**: Cross-origin resource sharing
- **Axios 1.12.2**: HTTP client for API calls

### External APIs
- **Spoonacular API**: Recipe suggestions and ingredient-based search

## 📁 Project Structure

```
grocetrack/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── api/           # API configuration
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── slices/        # Redux slices
│   │   ├── store/         # Redux store
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                # Node.js backend
│   ├── config/           # Database configuration
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── utils/            # Helper functions
│   ├── index.js          # Server entry point
│   └── package.json
│
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Spoonacular API key (free tier available)

### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd grocetrack/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=8000
   dbUrl=mongodb://localhost:27017/grocetrack
   # OR use MongoDB Atlas
   # dbUrl=mongodb+srv://username:password@cluster.mongodb.net/grocetrack
   
   JWT_SECRET=your_super_secret_jwt_key_here_change_this
   SPOONACULAR_API_KEY=your_spoonacular_api_key_here
   CLIENT_URL=http://localhost:5173
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```
   
   Server will run on `http://localhost:8000`

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd grocetrack/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   
   Create a `.env` file in the `client` directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Client will run on `http://localhost:5173`

### Getting Spoonacular API Key

1. Visit [Spoonacular API](https://spoonacular.com/food-api)
2. Sign up for a free account
3. Navigate to your dashboard
4. Copy your API key
5. Add it to your server `.env` file

## 🌐 Deployment

### Backend Deployment (Render/Railway/Heroku)

1. **Prepare for deployment**
   - Ensure all environment variables are set on your hosting platform
   - Update `CLIENT_URL` to your deployed frontend URL
   - Set `NODE_ENV=production`

2. **Environment Variables Required**
   ```
   PORT=8000
   dbUrl=<your_mongodb_atlas_connection_string>
   JWT_SECRET=<your_jwt_secret>
   SPOONACULAR_API_KEY=<your_api_key>
   CLIENT_URL=<your_deployed_frontend_url>
   ```

3. **Build command**: `npm install`
4. **Start command**: `node index.js`

### Frontend Deployment (Vercel/Netlify)

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Environment Variables**
   ```
   VITE_API_BASE_URL=<your_deployed_backend_url>/api
   ```

3. **Deploy**
   - **Vercel**: Connect your GitHub repo and deploy automatically
   - **Netlify**: Connect your GitHub repo or drag & drop the `dist` folder

4. **Update CORS**
   - After deployment, update the backend's `CLIENT_URL` environment variable to match your frontend URL

## 📱 Usage Guide

### Getting Started

1. **Register an Account**
   - Navigate to the registration page
   - Enter your name, email, and password
   - You'll be automatically logged in and redirected to the dashboard

2. **Add Your First Grocery Item**
   - Go to the Grocery page
   - Click "+ Add Item"
   - Fill in the details:
     - Item name
     - Category (fruits, vegetables, etc.)
     - Quantity and unit
     - Expiry date
   - Click "Save Item"

3. **Monitor Your Dashboard**
   - View total items count
   - Check items expiring soon (within 3 days)
   - Monitor low stock items (≤ 2 units)
   - Analyze category distribution with the pie chart

4. **Discover Recipes**
   - Navigate to the Recipes page
   - Browse suggested recipes based on your groceries
   - Green badges show ingredients you have
   - Red badges show missing ingredients
   - Save recipes to your collection

5. **Manage Recipes**
   - Add your own recipes with custom ingredients
   - View detailed instructions
   - Edit or delete recipes
   - Upload recipe images

6. **Update Profile**
   - Go to Settings
   - Update your name or email
   - Change your password (requires current password)

## 🔒 Security Features

- **Password Hashing**: Bcrypt with 10 salt rounds
- **HTTP-Only Cookies**: Prevents XSS attacks
- **JWT Authentication**: Secure token-based auth
- **Protected Routes**: Both client and server-side protection
- **CORS Configuration**: Controlled cross-origin requests
- **SameSite Cookie Policy**: CSRF protection
- **Environment Variables**: Sensitive data protection

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Color-Coded Items**: 
  - Red border: Expiring within 3 days
  - Yellow border: Low stock (≤ 2 units)
- **Smooth Animations**: Framer Motion for fluid transitions
- **Toast Notifications**: Real-time feedback for all actions
- **Loading States**: Clear loading indicators
- **Error Handling**: User-friendly error messages
- **Search & Filter**: Quick item discovery
- **Modal Dialogs**: Clean recipe viewing experience

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Groceries
- `GET /api/grocery` - Get all groceries
- `POST /api/grocery` - Create grocery item
- `PUT /api/grocery/:id` - Update grocery item
- `DELETE /api/grocery/:id` - Delete grocery item

### Recipes
- `GET /api/recipes` - Get user recipes
- `POST /api/recipes` - Create recipe
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe
- `GET /api/recipes/from-api` - Get recipe suggestions from Spoonacular

### User
- `PUT /api/user/profile` - Update user profile

## 🐛 Known Issues & Future Enhancements

### Known Issues
- Recipe API rate limiting on free tier (150 requests/day)
- Image upload not yet implemented (URL-based only)

### Planned Features
- [ ] Barcode scanning for quick item addition
- [ ] Shopping list generation based on low stock items
- [ ] Household sharing for family members
- [ ] Meal planning calendar
- [ ] Nutritional information tracking
- [ ] Waste tracking and analytics
- [ ] Mobile app (React Native)
- [ ] Push notifications for expiring items
- [ ] Image upload for groceries and recipes
- [ ] PDF export for shopping lists
- [ ] Dark mode support

## 📧 Contact & Support

For questions, issues, or suggestions:
- Open an issue on GitHub
- Email: [your-email@example.com]

## 🙏 Acknowledgments

- [Spoonacular API](https://spoonacular.com/food-api) for recipe data
- [Recharts](https://recharts.org/) for beautiful charts
- [Lucide Icons](https://lucide.dev/) for clean icons
- [Tailwind CSS](https://tailwindcss.com/) for rapid styling

---

**Made with ❤️ for smarter grocery management**