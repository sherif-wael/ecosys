import { ThemeProvider } from "styled-components";
import theme from "utils/theme";
import { useTranslation } from "react-i18next"

function AppTheme(props){
    const { i18n } = useTranslation();

    const langProps = {
        isArabic: i18n.language.toLowerCase().startsWith("ar"),
        isEnglish: i18n.language.toLowerCase().startsWith("en"),
    };

    return <ThemeProvider theme={{...theme, ...langProps}} {...props} />
}

export default AppTheme;