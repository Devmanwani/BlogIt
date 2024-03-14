
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-700 mb-8">The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-600 hover:text-blue-800">
        Go back to home
      </Link>
    </div>
  );
};

export default NotFoundPage;
