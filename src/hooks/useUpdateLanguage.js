import { useMutation } from "react-query";
import useClient from "./useClient";

function useUpdateLanguage(options = {}){
    const client = useClient();

    return useMutation(
        locale => client({ endpoint: "api/v1/users/locale", method: "PUT", data: { locale } }).then(() => locale),
        {
            ...options
        }
    );
}

export default useUpdateLanguage;