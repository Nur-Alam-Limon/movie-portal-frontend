import React from "react";

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      title: "Extensive Library",
      description:
        "Discover thousands of movies and series across all genres, curated and updated regularly.",
      icon: "🎬",
    },
    {
      title: "Secure & Smooth Streaming",
      description:
        "Enjoy HD streaming with industry-standard security and blazing-fast performance.",
      icon: "🔒",
    },
    {
      title: "Community & Reviews",
      description:
        "Join a passionate community — rate, review, comment, and connect with fellow cinephiles.",
      icon: "💬",
    },
  ];

  return (
    <section className="px-4 sm:px-8 lg:px-16 pb-20 bg-background text-foreground">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-heading font-semibold mb-8 sm:mb-12">
          Why Movie Portal?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-100 p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300 dark:bg-[#2A2A2A]"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl sm:text-2xl font-heading font-semibold mb-3 text-gray-800 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-base sm:text-md font-body text-gray-600 dark:text-white">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
