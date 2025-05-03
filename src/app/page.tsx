import Banner from "@/components/home/Banner";
import Categories from "@/components/home/Categories";
import FeaturedMovies from "@/components/home/FeaturedMovies";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedMovies headingText="Popular Movies" variant="popular" />
      <Categories />
      <FeaturedMovies headingText="Watch Drama" variant="Drama" />
      <FeaturedMovies headingText="Top Rated" variant="topRated" />
      <WhyChooseUs />
      <FeaturedMovies headingText="Watch Thriller Movies" variant="thriller" />
      <FeaturedMovies headingText="Watch Action Movies" variant="Action" />
      
    </div>
  );
}
