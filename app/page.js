import { Suspense } from "react";
import BookCard from "./_components/BookCard";
import BooksWrapper from "./_components/BooksWrapper";
import SpinnerMini from "./_components/SpinnerMini";
import Spinner from "./_components/Spinner";
import { CartProvider } from "./_components/CartContext";
import AboutUsSection from "./_components/AboutUsSection";
import CommentsSection from "./_components/CommentsSection";
import BookSliderSection from "./_components/BookSliderSection";

export const metadata = {
  title: "Welcome to Book Lovers",
};

export default function Home({ searchParams }) {
  return (
    <div>
      <BooksWrapper>
        <Suspense fallback={<Spinner />}>
          <BookCard searchParams={searchParams} />
        </Suspense>
      </BooksWrapper>
      <AboutUsSection />
      <CommentsSection />
      <BookSliderSection />
    </div>
  );
}
