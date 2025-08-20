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
      console.log(error);
    }
    route.refresh();
  };
  return (
    <button onClick={handleLogout}>
      <HiOutlineLogout />
    </button>
  );
}

export default LogoutButton;
