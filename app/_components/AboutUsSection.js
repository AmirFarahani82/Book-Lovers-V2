import { HiArrowDown } from "react-icons/hi2";
import { FaAngleDown } from "react-icons/fa";
import TabComponent from "./TabComponent";
import FadeInSections from "./FadeInSections";
function AboutUsSection() {
  return (
    <FadeInSections>
      <section className="mx-auto mt-12 w-[1100px] max-w-[90%]" id="about-us">
        <h2 className="mt-14.5 text-3xl font-semibold text-purple-500 md:text-4xl">
          درباره ما
        </h2>
        <h3 className="sub-heading mt-15 text-center text-2xl font-semibold text-purple-500">
          چرا باید از ما خرید کنید؟
          <FaAngleDown
            stroke="text-purple-500"
            className="arrow mx-auto mt-3.5 block text-3xl"
          />
        </h3>
        <TabComponent />
      </section>
    </FadeInSections>
  );
}

export default AboutUsSection;
