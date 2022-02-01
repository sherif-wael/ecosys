import React from "react";
import { useTranslation } from "react-i18next";

function useTextMapper(){
    const { i18n } = useTranslation();
    const suffix = i18n.language.startsWith("en") ? "_en" : "_ar";

    return React.useCallback(
        (obj, txt) => obj[txt + suffix],
        [suffix]
    );
}

export default useTextMapper;