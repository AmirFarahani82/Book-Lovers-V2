import { HiArchiveBox, HiArrowLeft } from "react-icons/hi2";

const { default: Link } = require("next/link");

function NotFound() {
  return (
    <main className="w-full mx-auto mt-8 text-center space-y-6">
      <h1>این صفحه وجود ندارد</h1>
      <Link
        href="/"
        className="flex items-center justify-center gap-1 underline text-purple-500 hover:text-purple-700"
      >
        <span>لطفا به صفحه اصلی برگردید</span>
        <HiArrowLeft />
      </Link>
    </main>
  );
}
export default NotFound;
