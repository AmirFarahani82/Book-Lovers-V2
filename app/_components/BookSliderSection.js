import { getbooks } from "../_lib/data-service";
import BookSlider from "./BookSlider";

async function BookSliderSection() {
  const { data } = await getbooks({});
  console.log(data);
  return (
    <section className="relative h-[50vh] w-full overflow-hidden sm:h-screen">
      <BookSlider books={data} />
    </section>
  );
}

export default BookSliderSection;
