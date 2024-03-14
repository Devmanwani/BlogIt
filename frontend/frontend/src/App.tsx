import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

const Signup = lazy(() => import('./pages/Signup'));
const Signin = lazy(() => import('./pages/Signin'));
const Blog = lazy(() => import('./pages/Blog'));
const Blogs = lazy(() => import('./pages/Blogs'));
const CreateBlog = lazy(() => import('./pages/CreateBlog.tsx'));
const EditBlog = lazy(() => import('./pages/EditBlog.tsx'));
const MyBlogs = lazy(() => import('./pages/MyBlogs.tsx'));
const NotFoundPage = lazy(() => import('./pages/404.tsx'));
const UserNavigate = lazy(() => import('./components/UserNavigate.tsx'));
const AdminSignInProvider = lazy(() => import('./components/AdminSignInProvider.tsx'));
const AdminBlogs = lazy(() => import('./pages/AdminBlogs.tsx'));
const Users = lazy(() => import('./pages/Users.tsx'));
import { UserProvider } from './contexts/UserContext.tsx';

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
     <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600"></div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<UserNavigate />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/admin' element={<AdminSignInProvider />} />
          <Route path='/admin/blogs' element={<AdminBlogs />} />
          <Route path='/admin/users' element={<Users />} />

          <Route path='/blog/:id' element={<UserProvider><Blog /></UserProvider>} />
          <Route path='/blogs' element={<UserProvider><Blogs /></UserProvider>} />
          <Route path='/CreateBlog' element={<UserProvider><CreateBlog /></UserProvider>} />
          <Route path='/EditBlog/:id' element={<UserProvider><EditBlog /></UserProvider>} />
          <Route path='/myBlogs' element={<UserProvider><MyBlogs /></UserProvider>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
