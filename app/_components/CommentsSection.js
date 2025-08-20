import Comments from "./Comments";
import FadeInSections from "./FadeInSections";

function CommentsSection() {
  return (
    <FadeInSections>
      <section
        className="comments mx-auto mt-12.5 mb-2.5 w-[1100px] max-w-[90%]"
        id="comments"
      >
        <h2 className="heading mt-14.5 text-xl font-semibold text-purple-500 sm:text-4xl">
          نظرات
        </h2>
        <Comments />
      </section>
    </FadeInSections>
  );
}

export default CommentsSection;
