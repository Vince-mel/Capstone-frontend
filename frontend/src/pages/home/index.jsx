import Container from "../../components/global/Container";
import Footer from "../../components/global/footer";
import AllBlogs from "../../components/home/AllBlogs";
import Hero from "../../components/home/Hero";
import Trending from "../../components/home/Trending";

const Home = () => {
  return (
    <>
      <Hero />
      <Trending />

      <Container>
        <AllBlogs />
      </Container>
      <Footer />
    </>
  );
};
export default Home;
