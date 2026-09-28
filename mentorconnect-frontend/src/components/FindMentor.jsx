import MentorSuggestions from "./MentorSuggestions";

function FindMentor() {
  return (
    <section className="fm-page">

      <div className="fm-header">
        <span>MENTOR MATCHING</span>

        <h2>Find your perfect mentor.</h2>

        <p>
          Enter your student ID to discover alumni mentors
          ranked according to shared interests.
        </p>
      </div>

      <MentorSuggestions />

    </section>
  );
}

export default FindMentor;