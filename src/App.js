import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PrivateRoute, PublicRoute } from "components/lib/RouteWrapper";
import GlobalStyle from "components/lib/GlobalStyle";
import * as home from "components/home";
import * as requests from "components/requests";
import * as messages from "components/messages";
import * as schedules from "components/schedules";
import * as products from "components/products";
import * as request from "components/requests";
import * as communities from "components/communities";
import * as dashboard from "components/dashboard";
import * as login from "components/login";
import * as guidebooks from "components/guidebooks";

// const Login = React.lazy(() => import("components/login").then(module => ({default: module.Login})));
// const Dashboard = React.lazy(() => import("components/dashboard").then(module => ({default: module.Dashboard})));
// const Schedules = React.lazy(() => import("components/schedules").then(module => ({ default: module.Schedules })));
// const CreateSchedule = React.lazy(() => import("components/schedules").then(module => ({ default: module.CreateSchedule })));
// const Schedule = React.lazy(() => import("components/schedules").then(module => ({ default: module.Schedule })));
// const Products = React.lazy(() => import("components/products").then(module => ({default: module.Products})));
// const CreateProduct = React.lazy(() => import("components/products").then(module => ({default: module.CreateProduct})));
// const Product = React.lazy(() => import("components/products").then(module => ({default: module.Product})));
// const Requests = React.lazy(() => import("components/requests").then(module => ({default: module.Requests})));
// const Request = React.lazy(() => import("components/requests").then(module => ({default: module.Request})));
// const Communities = React.lazy(() => import("components/communities").then(module => ({default: module.Communities})));
// const Community = React.lazy(() => import("components/communities").then(module => ({default: module.Community})));
// const Guidebooks = React.lazy(() => import("components/guidebooks").then(module => ({default: module.Guidebooks})));
// const Guidebook = React.lazy(() => import("components/guidebooks").then(module => ({default: module.Guidebook})));
// const CreateGuidebook = React.lazy(() => import("components/guidebooks").then(module => ({default: module.CreateGuidebook})));
// const CreateGuidebookTopic = React.lazy(() => import("components/guidebooks").then(module => ({default: module.CreateGuidebookTopic})));
// const GuidebookTopic = React.lazy(() => import("components/guidebooks").then(module => ({default: module.GuidebookTopic})));


// function Suspense({ Component }){
//     return (
//         <React.Suspense fallback={<>..</>}>
//             <Component />
//         </React.Suspense>
//     )
// }

function App(){
    return (
        <>
            <ToastContainer 
                theme="colored"
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <GlobalStyle />

            <Routes>
                <Route path="/" element={<PublicRoute />}>
                    <Route index element={<home.Home />} />
                    <Route path="requests/:id" element={<requests.Request />} />
                </Route>
                {/* <Route path="/admin/login" element={<Suspense Component={Login} />} /> */}
                <Route path="/admin/login" element={<login.Login />} />
                <Route path="/admin" element={<PrivateRoute />}>
                <Route index element={<dashboard.Dashboard />} />
                    <Route path="schedules" element={<schedules.Schedules />} />
                    <Route path="schedules/:id" element={<schedules.Schedule />} />
                    <Route path="schedules/create" element={<schedules.CreateSchedule />} />
                    <Route path="products" element={<products.Products />} />
                    <Route path="products/create" element={<products.CreateProduct />} /> 
                    <Route path="products/:id" element={<products.Product />} />
                    <Route path="requests" element={<request.Requests />} />
                    <Route path="requests/:id" element={<request.Request />} />
                    <Route path="communities" element={<communities.Communities />} />
                    <Route path="communities/:id" element={<communities.Community />} /> 
                    <Route path="guidebooks" element={<guidebooks.Guidebooks />} />
                    <Route path="guidebooks/create" element={<guidebooks.CreateGuidebook />} />
                    <Route path="guidebooks/:id" element={<guidebooks.Guidebook />} />
                    <Route path="topics/create/:guidebook" element={<guidebooks.CreateGuidebookTopic />} />
                    <Route path="topics/:id" element={<guidebooks.GuidebookTopic />} />
                    {/* <Route index element={<Suspense Component={Dashboard} />} />
                    <Route path="schedules" element={<Suspense Component={Schedules} />} />
                    <Route path="schedules/:id" element={<Suspense Component={Schedule} />} />
                    <Route path="schedules/create" element={<Suspense Component={CreateSchedule} />} />
                    <Route path="products" element={<Suspense Component={Products} />} />
                    <Route path="products/create" element={<Suspense Component={CreateProduct} />} /> 
                    <Route path="products/:id" element={<Suspense Component={Product} />} />
                    <Route path="requests" element={<requests.Requests />} />
                    <Route path="communities" element={<Suspense Component={Communities} />} />
                    <Route path="communities/:id" element={<Suspense Component={Community} />} /> 
                    <Route path="guidebooks" element={<Suspense Component={Guidebooks} />} />
                    <Route path="guidebooks/create" element={<Suspense Component={CreateGuidebook} />} />
                    <Route path="guidebooks/:id" element={<Suspense Component={Guidebook} />} />
                    <Route path="topics/create/:guidebook" element={<Suspense Component={CreateGuidebookTopic} />} />
                    <Route path="topics/:id" element={<Suspense Component={GuidebookTopic} />} /> */}
                    <Route path="messages" element={<messages.Messages />} />
                    <Route path="messages/:id" element={<messages.Message />} />
                </Route>
            </Routes>
        </>
    )
}

export default App;