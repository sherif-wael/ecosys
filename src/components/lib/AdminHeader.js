import styled from "styled-components";
import Text from "./Text";
import useAuth from "hooks/useAuth";
import Avatar from "./Avatar";
import LanguageToggler from "./LanguageToggler";

export function AdminHeader({ title }){
    const { user } = useAuth();

    return (
        <Header>
            <Text size="xxl" as="h2">{title}</Text>

            <div className="user-info">
                <Text size="md" as="p">{user.name}</Text>
                <Avatar photo={user.photo} name={user.name} />
                <LanguageToggler className="toggler" />
            </div>
        </Header>
    )
}

const Header = styled.div`
    ${props => props.theme.mixins.flexSpaceBetween};
    background-color: var(--white-color);
    padding: 8px 24px;
    border-radius: 5px;
    text-transform: capitalize;
    margin: 0 0 30px;

    h2{
        font-weight: 700;
    }

    .user-info{
        ${props => props.theme.mixins.flexCenter}

        p{
            margin-inline-end: 15px;
        }
    }

    .toggler{
        color: var(--primary-color);
    }
`;

export default AdminHeader;