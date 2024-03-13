import {Link} from 'react-router-dom';

const Welcome = () => {
  const date = new Date();
  const today =new Intl.DateTimeFormat('us-TN', {dateStyle: 'full',
  timeStyle: 'long'}).format(date)
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p>{today}</p>
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Website!</h1>
      <p className="text-lg mb-6">
        Thank you for visiting. Feel free to explore our content and learn more
        about us.
      </p>
      <Link
        to="/about"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Learn More
      </Link>

      <button className="mt-4">
        <Link
          to="/auth/signin"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Sign In
        </Link>
      </button>
    </div>
  );
};

export default Welcome;