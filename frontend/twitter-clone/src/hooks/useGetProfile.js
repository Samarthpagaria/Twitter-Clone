import axios from "axios";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../redux/userSlice";
import { USER_API_ENDPOINT } from "../utils/constant";

const useGetProfile = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const res = await axios.get(`${USER_API_ENDPOINT}/profile/${id}`, {
          withCredentials: true,
        });
        console.log(res);
        dispatch(getMyProfile(res.data.user));
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyProfile();
  }, [id]);
};
export default useGetProfile;
