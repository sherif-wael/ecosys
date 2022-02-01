import { render } from "@testing-library/react";
import AppTheme from "components/providers/AppTheme";

export function customRender(ui){
    return render(
        <AppTheme>
            {ui}
        </AppTheme>
    )
}