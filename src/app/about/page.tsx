import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="container mx-auto py-12">
      <section className="text-center my-16">
        <h1 className="text-4xl font-bold mb-4 text-blue-400">
          About Movie Portal
        </h1>
        <p className="text-lg mx-auto">
          Welcome to{" "}
          <span className="font-semibold text-blue-400">Movie Portal</span> —
          your ultimate destination for discovering, rating, and streaming the
          best of cinema and television. Whether you're someone who watches
          casually on weekends or a die-hard cinephile with a curated watchlist,
          Movie Portal is designed with you in mind. Dive into our expansive
          collection of movies and TV shows across genres, decades, and
          languages. Find hidden gems, explore trending releases, and revisit
          timeless classics — all in one place. Our user-friendly interface
          allows you to browse effortlessly, while personalized recommendations
          help you find content you'll love. Beyond just watching, Movie Portal
          lets you be part of the conversation. Share your thoughts through
          detailed ratings and reviews, follow what others are watching, and
          build your own profile as a film enthusiast. With a vibrant community
          and powerful tools, we turn passive viewing into a shared experience.
          <br />
          <br />
          Join us on this journey where stories come alive — because at Movie
          Portal, we believe that great entertainment should be accessible,
          meaningful, and most of all, enjoyable.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">Our Mission</h2>
          <p className="leading-relaxed">
            At <span className="font-semibold text-blue-400">Movie Portal</span>
            , our mission goes beyond just streaming — we're building a vibrant,
            community-driven platform where film lovers of all kinds can come
            together. We aim to create a space where discovering new movies and
            series is as exciting as watching them.
            <br />
            <br />
            Our rich and ever-growing library spans across genres, cultures, and
            time periods — offering something for everyone. But what truly sets
            us apart is the ability for users to contribute: rate what you’ve
            seen, write thoughtful reviews, and engage in meaningful discussions
            with fellow viewers from around the globe.
            <br />
            <br />
            We’re guided by values of transparency, inclusivity, and innovation.
            By combining cutting-edge technology with a passion for
            storytelling, we strive to deliver a seamless, enjoyable, and
            personalized entertainment experience for every user.
          </p>
        </div>
        <Image
          src="https://img.freepik.com/free-vector/company-employees-planning-task-brainstorming_74855-6316.jpg?uid=R8647428&ga=GA1.1.805615852.1737822151&semt=ais_hybrid&w=740"
          alt="Team Planning Illustration"
          width={700}
          height={500}
          className="rounded-xl shadow-md"
        />
      </section>

      <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <Image
          src="https://img.freepik.com/free-vector/coworking-concept-illustration_114360-5921.jpg?uid=R8647428&ga=GA1.1.805615852.1737822151&semt=ais_hybrid&w=740"
          alt="Coworking Illustration"
          width={700}
          height={500}
          className="rounded-xl shadow-md"
        />
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">Who We Are</h2>
          <p className="leading-relaxed">
            <span className="font-semibold text-blue-400">Movie Portal</span>{" "}
            was crafted by a dedicated team of developers, designers, and movie
            enthusiasts who share a deep love for storytelling and technology.
            What started as a shared vision has grown into a powerful platform
            fueled by passion, creativity, and collaboration.
            <br />
            <br />
            Leveraging the latest in full-stack development — from
            lightning-fast front-end frameworks to scalable, secure backend
            systems — we’ve built a platform that’s not only robust but
            delightful to use. Whether you're browsing on mobile or desktop,
            Movie Portal ensures a smooth, responsive experience across the
            globe.
            <br />
            <br />
            But we don’t stop there. Our team is constantly innovating behind
            the scenes — improving features, enhancing performance, and
            expanding the content library so that your movie-watching journey
            never hits a dull moment.
          </p>
        </div>
      </section>

      <section className="text-center mb-16">
        <h2 className="text-2xl font-bold text-blue-400 mb-4">
          Join the Movie Portal Experience
        </h2>
        <p className="mb-6 mx-auto">
          Ready to dive into a universe of cinema like never before?
          Sign up today and unlock access to a dynamic world where every film
          has a voice and every viewer matters. Rate the shows and movies you
          love, share your opinions through thoughtful reviews, and connect with
          a community that’s just as passionate as you are.
          <br />
          <br />
          Your next favorite film is just a click away — start discovering it
          now on{" "}
          <span className="font-semibold text-blue-400">Movie Portal</span>.
        </p>
        <a
          href="/register"
          className="inline-block bg-blue-400 text-white font-medium py-3 px-6 rounded-full shadow hover:bg-indigo-700 transition"
        >
          Get Started
        </a>
      </section>
    </main>
  );
}
