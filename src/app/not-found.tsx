import { FaExclamationTriangle } from "react-icons/fa";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
      <FaExclamationTriangle className="text-red-500 text-6xl mb-4" />
      <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
      <p className="mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link
        href="/"
        className="px-6 py-2 text-white bg-[#2A2A2A] rounded hover:bg-[#2A2A2A] transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
