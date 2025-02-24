import ProfileCard from "./ProfileCard";

const BentoGrid = () => {
  return (
    <div className="grid auto-cols-[24%] auto-rows-[1fr] gap-5 grid-template-area font-[Inter]">
      <div className="bentoProfile">
        <ProfileCard />
      </div>
      <div className="bg-blue-800 bentoWeather">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia modi
        doloribus incidunt sit omnis blanditiis mollitia rerum dolorum qui odio
        distinctio tenetur a, facere fugit earum. Nobis nesciunt deleniti
        consectetur.
      </div>
      <div className="bg-blue-800 bentoSummary"></div>
      <div className="bg-blue-800 bentoSuggestion"></div>
    </div>
  );
};

export default BentoGrid;
