import axios from "axios";

let errorOutput = {
    ok: false,
    items: [],
};

const getDataFromZipCode = async (zipCode) => {
    try {
        let response = await axios.get(
            `https://9infxj1og6.execute-api.us-east-1.amazonaws.com/latest/localidades?cp=${zipCode}`
        );

        if (response.status === 200) {
            const { Count, Items } = response.data;

            if (Count > 0) {
                return {
                    ok: true,
                    items: Items,
                };
            } else
                return {
                    ...errorOutput,
                    message: "No se encontró el Código Postal",
                };
        } else {
            return {
                ...errorOutput,
                error: response.status + " - " + response.statusText,
                message:
                    "Se produjo un error al buscar el Código Postal. Inténtelo nuevamente",
            };
        }
    } catch (error) {
        return {
            ...output,
            error,
            message:
                "Se produjo un error al buscar el Código Postal. Inténtelo nuevamente",
        };
    }
};

export default getDataFromZipCode;
