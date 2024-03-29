import dashboard from "static/dashboard.svg";
import products from "static/products.svg";
import schedule from "static/schedule.svg";
import requests from "static/requests.svg";
import community from "static/community.svg";
import guidebook from "static/guidebook.svg";
import { FaRegEnvelope as Envelope } from "react-icons/fa";

export const SIDEBAR_LINKS = [
    {
        href: "/admin",
        label: "dashboard",
        icon: (<img src={dashboard} alt="dashboard" />)
    },
    {
        href: "/admin/products",
        label: "productsCatalog",
        icon: (<img src={products} alt="products" />)
    },
    {
        href: "/admin/schedules",
        label: "waterSchedule",
        icon: (<img src={schedule} alt="schedule" />)
    },
    {
        href: "/admin/requests",
        label: "requests",
        icon: (<img src={requests} alt="requests" />)
    },
    {
        href: "/admin/guidebooks",
        label: "guidebook",
        icon: (<img src={guidebook} alt="guidebook" />)
    },
    {
        href: "/admin/communities",
        label: "community",
        icon: (<img src={community} alt="community" />)
    },
    {
        href: "/admin/messages",
        label: "messages",
        icon: (<Envelope />)
    }
];


export const HEADER_LINKS = [
    {
        href: "/",
        label: "home"
    },
    {
        href: "#about",
        label: "about"
    },
    {
        href: "#contact",
        label: "contactUs"
    }
];