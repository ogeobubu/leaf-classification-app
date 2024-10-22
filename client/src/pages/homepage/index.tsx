import Button from "../../components/button";
import bgImage from "../../assets/leaf-bg.png";

const Homepage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="h-[100vh]"
    >
      <div className="overlay absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="above-overlay absolute top-0 left-0 w-full h-full z-10">
        <div className="flex flex-col justify-center items-center p-4 md:max-w-4xl m-auto h-[100%]">
          <h1 className="text-4xl text-white my-8">
            Leaf Identification System
          </h1>
          <p className="text-white text-2xl">
            <strong className="text-4xl">Welcome</strong> to our leaf
            identification system. This tool is designed to help you easily
            identify plants based on their leaves. Simply upload an image of a
            leaf, and our advanced algorithms will analyze its unique features
            to provide accurate results
          </p>
          <div className="flex md:flex-row flex-col gap-3 justify-between items-center w-full mt-8">
            <Button className="w-[100%]" href="/upload">Identify Leaf</Button>
            <Button>Learn More</Button>
            <Button>About Us</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
