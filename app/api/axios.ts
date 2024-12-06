import axios, { AxiosResponse, AxiosError } from "axios";

interface GetRequestParams {
  [key: string]: any;
}

interface ErrorResponse {
  msg?: string;
  errors?: string;
}

const GET_REQUEST = async (
  url: string,
  token: string,
  params?: GetRequestParams
): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params || {},
      withCredentials: true,
    });
    return response.data;
  } catch (error: unknown) {
    // Narrow down error type
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response) {
        // Handle server-side errors
        if (axiosError.response.status === 401) {
          return axiosError.response.data;
        }
        return (
          axiosError.response.data?.msg ||
          axiosError.response.data?.errors ||
          "Server Error"
        );
      } else if (axiosError.request) {
        // No response received from the server
        console.error("No response received:", axiosError.request);
        return "No response from server. Please try again.";
      } else if (axiosError.code === "ERR_NETWORK") {
        alert(axiosError.message || "Slow internet connection");
      }
    } else {
      console.error("Unexpected error:", error);
      return "An unexpected error occurred.";
    }
  }
};

// const POST_REQUEST = async (url, token, data) => {
//   return await axios
//     .post(url, data, {
//       headers: { Authorization: `${token}` },
//       withCredentials: true,
//     })
//     .then(
//       (response) => response,
//       (error) => {
//         if (error.status === 401) {
//           return error.response.data;
//         }
//         return (
//           error.response.data.msg ||
//           error.response.data.errors ||
//           "Server Error"
//         );
//       },
//       (error) => {
//         if (error.code == "ERR_NETWORK")
//           alert(error?.message || "Slow internet connection");
//         else return error;
//       }
//     );
// };

// const PUT_REQUEST = async (url, token, data) => {
//   return await axios
//     .put(url, data, {
//       headers: { Authorization: `${token}` },
//       withCredentials: true,
//     })
//     .then(
//       (response) => response,
//       (error) => {
//         if (error.status === 401) {
//           return error.response.data;
//         }
//         return (
//           error.response.data.msg ||
//           error.response.data.errors ||
//           "Server Error"
//         );
//       },
//       (error) => {
//         if (error.code == "ERR_NETWORK")
//           alert(error?.message || "Slow internet connection");
//         else return error;
//       }
//     );
// };

// const DELETE_REQUEST = async (url, token) => {
//   return await axios
//     .delete(url, {
//       headers: { Authorization: `${token}` },
//       withCredentials: true,
//     })
//     .then(
//       (response) => response,
//       (error) => {
//         if (error.status === 401) {
//           return error.response.data;
//         }
//         return (
//           error.response.data.msg ||
//           error.response.data.errors ||
//           "Server Error"
//         );
//       },
//       (error) => {
//         if (error.code == "ERR_NETWORK")
//           alert(error?.message || "Slow internet connection");
//         else return error;
//       }
//     );
// };

// const PATCH_REQUEST = async (url, token, data) => {
//   return await axios
//     .patch(url, data, {
//       headers: { Authorization: `${token}` },
//       withCredentials: true,
//     })
//     .then(
//       (response) => response,
//       (error) => {
//         if (error.status === 401) {
//           return error.response.data;
//         }
//         return (
//           error.response.data.msg ||
//           error.response.data.errors ||
//           "Server Error"
//         );
//       },
//       (error) => {
//         if (error.code == "ERR_NETWORK")
//           alert(error?.message || "Slow internet connection");
//         else return error;
//       }
//     );
// };

export default {
  GET_REQUEST,
  //   POST_REQUEST,
  //   PUT_REQUEST,
  //   DELETE_REQUEST,
  //   PATCH_REQUEST,
};
