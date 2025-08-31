"use client";
import { useRouter } from "next/navigation";
import { logout } from "../_lib/actions";
import { HiOutlineLogout } from "react-icons/hi";

function LogoutButton() {
  const route = useRouter();

  const handleLogout = async () => {
    try {
      const result = await logout();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return (
    <button onClick={handleLogout}>
      <HiOutlineLogout />
    </button>
  );
}

export default LogoutButton;
