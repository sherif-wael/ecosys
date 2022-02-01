import styled from "styled-components";
import AdminHeader from "components/lib/AdminHeader";
import { useDashboard } from "hooks/dashboard";
import AsyncContainer from "components/lib/AsyncContainer";
import Text from "components/lib/Text";
import { useTranslation } from "react-i18next";

function Dashboard(){
    const { data: dashboard, ...state } = useDashboard();
    const { t } = useTranslation();
    
    return (
        <>
            <AdminHeader title={t("dashboard")} />

            <Wrapper {...state}>
                {
                    dashboard
                    &&
                    <div className="grid">
                        <div className="card">
                            <Text size="xxl">{t("numberOfUsers")}</Text>
                            <Text size="xxl">{dashboard.users_count}</Text>
                        </div>
                        <div className="card">
                            <Text size="xxl">{t("numberOfDevices")}</Text>
                            <Text size="xxl">{dashboard.devices_count}</Text>
                        </div>
                    </div>
                }
            </Wrapper>
        </>
    )
}

const Wrapper = styled(AsyncContainer)`
    &.loading{
        height: 200px;
    }

    .grid{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
    }

    .card{
        ${props => props.theme.mixins.flexColCenter};
        background-color: #fff;
        border-radius: 10px;
        padding: 32px;
    }

    p{
        font-weight: 700;
    }
`;

export {
    Dashboard
}