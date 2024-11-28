import axios from "axios";

export const loginApiCall = async (username, otp) => {
    const payload =  { username, otp }
  const response = await axios.post(`https://assignment.stage.crafto.app/login`,payload);
  return response.data.token; 
};


export const getQuotesList = async (token, limit, offset) => {
    const response = await axios.get(`https://assignment.stage.crafto.app/getQuotes`, {
      headers: { Authorization: token },
      params: { limit, offset },
    });
    return response.data;
  };

export const uploadMedia = async (file) => {
  const payload = new FormData();
  payload.append("file", file);
  const response = await axios.post(`https://crafto.app/crafto/v1.0/media/assignment/upload`, payload);
  return response.data.mediaUrl;
};

export const createQuote = async (token, text, mediaUrl) => {
  await axios.post(
    `https://assignment.stage.crafto.app/postQuote`,
    { text, mediaUrl },
    { headers: { Authorization: token } }
  );
};

