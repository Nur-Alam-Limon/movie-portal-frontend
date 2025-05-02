import Banner from "@/components/home/Banner";
import Categories from "@/components/home/Categories";
import FeaturedMovies from "@/components/home/FeaturedMovies";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <Banner />
      <Categories />
      <FeaturedMovies />
      <WhyChooseUs />
    </div>
  );
}
