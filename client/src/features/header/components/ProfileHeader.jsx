import HeaderAvatar from "./HeaderAvatar";

const ProfileHeader = () => {
  return (
    <div className="flex flex-1 items-center justify-between">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <HeaderAvatar />
    </div>
  );
};

export default ProfileHeader;
