
export const AuthButton = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
<button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition">
      {isLoggedIn ? "Logout" : "Login"}
    </button>
  );
};
