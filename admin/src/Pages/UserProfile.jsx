import UpadaUserFrom from "../Feature/UpadaUserFrom";

function UserProfile() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-4xl font-bold px-5">Update Your Account</h2>
      <UpadaUserFrom />
    </div>
  );
}

export default UserProfile;
