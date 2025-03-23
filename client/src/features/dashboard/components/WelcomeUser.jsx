const WelcomeUser = ({ user }) => {
  return (
    <div className="flex w-full flex-col gap-3 text-4xl font-semibold p-4">
      <h1 className="">Welcome Home, {user}</h1>
    </div>
  );
};

export default WelcomeUser;
