import axios from "axios";

const getRandomUser = async () => {
  const response = await axios.get(
    "https://random-data-api.com/api/v2/users?size=2&is_xml=true",
    {
      headers: {}, //you can pass authorization here
      params: {
        size: 1, //need one data only
      },
    }
  );
  return response;
};

export { getRandomUser };
