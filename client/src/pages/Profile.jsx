import { useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { PhoneInput } from "react-international-phone";
import CountrySelect from "@components/CountrySelect";
import "react-international-phone/style.css";
import {
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon,
  ArrowUpTrayIcon,
  TrashIcon
} from "@heroicons/react/24/outline";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [changePhoto, setChangePhoto] = useState(false);
  const [location, setLocation] = useState({
    country: null,
    state: null,
    city: null,
  });
  const [changeDetails, setChangeDetails] = useState(false);
  const { firstName, lastName, email, profilePhotoURL } = currentUser;
  const genderList = [
    { id: "male", displayText: "Male" },
    { id: "female", displayText: "Female" },
    { id: "others", displayText: "Others" },
  ];

  const [formData, setFormData] = useState({
    firstName,
    lastName,
    email,
    profilePhotoURL,
    mobile: "",
    gender: "",
    dateOfBirth: "",
    country: location.country,
    state: location.state,
    city: location.city,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      mobile: value,
    }));
  };

  const handleSetLocation = useCallback((country, state, city) => {
    setLocation({ country, state, city });
  }, []);

  return (
    <div className="flex justify-center w-full py-4">
      <div className="shadow-lg ring-1 ring-black p-4 rounded-lg ring-opacity-25 xl:w-[55%] w-[80%] gap-y-4 flex flex-col">
        <div className="flex justify-between items-center md:px-4 px-2 py-2 gap-x-4">
          <h1 className="text-2xl md:text-4xl font-bold font-urbanist text-slate-800">
            {changeDetails ? "Edit Profile" : "Profile"}
          </h1>
          {!changeDetails && (
            <button
              type="button"
              className="flex text-gray-800 hover:underline underline-offset-2 md:text-base text-sm"
              onClick={() => setChangeDetails(true)}
            >
              <PencilSquareIcon className="size-5" />
              Edit Details
            </button>
          )}
          {changeDetails && (
            <div className="flex justify-between items-center gap-x-4">
              <button
                type="button"
                className="flex justify-between items-center text-gray-800 hover:underline underline-offset-2 md:text-base text-sm"
                onClick={() => setChangeDetails(false)}
              >
                <CheckIcon className="size-5" />
                Save
              </button>
              <button
                type="button"
                className="flex justify-between items-center text-gray-800 hover:underline underline-offset-2 md:text-base text-sm"
                onClick={() => setChangeDetails(false)}
              >
                <XMarkIcon className="size-5" />
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className="flex md:flex-row flex-col justify-between items-start">
          <div className="p-4 md:w-[35%] w-full flex flex-col gap-y-4 justify-center items-center">
            <img
              src={profilePhotoURL}
              alt="profile photo"
              className="w-[200px] h-[200px] rounded-full"
            />
            {changeDetails && (
              <div className="flex justify-between items-center gap-x-4">
                <button
                  type="button"
                  className="flex items-center text-gray-800 hover:underline gap-x-1 underline-offset-2 md:text-base text-sm"
                  // onClick={() => setChangePhoto(false)}
                >
                  <ArrowUpTrayIcon className="size-4" />
                  Upload
                </button>
                <button
                  type="button"
                  className="flex items-center text-gray-800 hover:underline gap-x-1 underline-offset-2 md:text-base text-sm"
                  // onClick={() => setChangePhoto(false)}
                >
                  <TrashIcon className="size-4" />
                  Delete
                </button>
              </div>
            )}
          </div>

          <form className="md:w-[60%] w-full flex flex-col items-start gap-y-4 px-4 py-2">
            <div className="flex lg:flex-row flex-col justify-between items-center xl:gap-x-8 lg:gap-x-4 gap-y-4 lg:gap-y-0 w-full">
              <div className="flex flex-col justify-between items-start gap-y-1 lg:w-auto w-full">
                <label htmlFor="firstName" className="font-semibold">
                  FirstName
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  id="firstName"
                  onChange={handleInputChange}
                  name="firstName"
                  className="bg-gray-100 p-2 border-2 border-gray-400 rounded-md outline-none w-full"
                  disabled={!changeDetails}
                />
              </div>
              <div className="flex flex-col justify-between items-start gap-y-1 lg:w-auto w-full">
                <label htmlFor="lastName" className="font-semibold">
                  LastName
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  id="lastName"
                  onChange={handleInputChange}
                  name="lastName"
                  className="bg-gray-100 p-2 border-2 border-gray-400 rounded-md outline-none w-full"
                  disabled={!changeDetails}
                />
              </div>
            </div>
            {/* <div className="flex flex-col justify-between items-start gap-y-1 w-full">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                type="text"
                value={formData.email}
                id="email"
                onChange={handleInputChange}
                name="email"
                className="bg-gray-100 p-2 border-2 border-gray-400 rounded-md outline-none w-full"
              />
            </div> */}
            <div className="flex flex-col justify-between items-start gap-y-1 w-full">
              <label htmlFor="dateOfBirth" className="font-semibold">
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                id="dateOfBirth"
                onChange={handleInputChange}
                name="dateOfBirth"
                placeholder=""
                className="bg-gray-100 p-2 border-2 border-gray-400 rounded-md outline-none w-full"
                disabled={!changeDetails}
              />
            </div>
            <div className="flex flex-col justify-between items-start gap-y-1 w-full">
              <label htmlFor="mobile" className="font-semibold">
                Mobile
              </label>
              <PhoneInput
                defaultCountry="in"
                value={formData.mobile}
                id="mobile"
                name="mobile"
                forceDialCode={true}
                onChange={handlePhoneChange}
                disabled={!changeDetails}
              />
            </div>
            <div className="flex flex-col justify-between items-start gap-y-1 w-full">
              <label htmlFor="gender" className="font-semibold">
                Gender
              </label>
              <div className="flex justify-between items-center gap-x-4">
                {genderList.map((gender) => (
                  <div
                    className="flex justify-between items-center gap-x-2"
                    key={gender.id}
                  >
                    <input
                      id={gender.id}
                      type="radio"
                      name="gender"
                      value={gender.id}
                      onChange={handleInputChange}
                      className="cursor-pointer w-4 h-4"
                      disabled={!changeDetails}
                    />
                    <label
                      htmlFor={gender.id}
                      className="flex items-center cursor-pointer"
                    >
                      {gender.displayText}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <CountrySelect handleSetLocation={handleSetLocation} changeDetails={changeDetails} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;