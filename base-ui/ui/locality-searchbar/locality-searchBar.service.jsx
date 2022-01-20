import axios from "axios";

const getDataFromZipCode = async (zipCode) =>
    await axios.get(
        `https://9infxj1og6.execute-api.us-east-1.amazonaws.com/latest/localidades?cp=${zipCode}`
    );

export default getDataFromZipCode;
