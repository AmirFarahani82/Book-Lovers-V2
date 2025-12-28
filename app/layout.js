import { Toaster } from "react-hot-toast";
import HeaderBottom from "./_components/Header/HeaderBottom";
import "./globals.css";
import HeaderTop from "@/app/_components/Header/HeaderTop";
import { CartProvider } from "./_components/CartContext";
import Footer from "./_components/Footer";
import { getUser } from "./_lib/actions";

export const metadata = {
  title: {
    template: "%s | Book Lovers",
    default: "Book Lovers",
  },
};

export default async function RootLayout({ children }) {
  const currentUser = await getUser();

  return (
    <html lang="fa" dir="rtl">
      <body className="bg-gray-200">
        <CartProvider>
          <header>
            <HeaderTop currentUser={currentUser} />
            <HeaderBottom />
          </header>
          <main>{children}</main>
          <Toaster
            position="top-left"
            toastOptions={{
              success: {
                iconTheme: {
                  primary: "#8B5CF6",
                  secondary: "white",
                },
              },
            }}
          />
        </CartProvider>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
