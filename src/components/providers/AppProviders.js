import { BrowserRouter as Router } from "react-router-dom";
import AppTheme from "./AppTheme";
import AuthProvider from "./AuthProvider";
import StoreProvider from "./StoreProvider";

function AppProviders({ children }){
    return (
        <StoreProvider>
            <Router>
                <AppTheme>
                    <AuthProvider>{children}</AuthProvider>
                </AppTheme>
            </Router>
        </StoreProvider>
    )
}

export default AppProviders;