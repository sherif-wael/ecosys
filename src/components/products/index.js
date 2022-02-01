import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import ProductsTable from "./ProductsTable";
import ProductForm from "./ProductForm";
import { useProducts, useProduct, useCreateProduct, useEditProduct } from "hooks/products";
import AdminHeader from "components/lib/AdminHeader";
import HeaderLink from "components/lib/HeaderLink";
import AsyncContainer from "components/lib/AsyncContainer";
import { useTranslation } from "react-i18next";
import { convertObjectToFormData } from "utils/helpers";
import AppError from "utils/appError";

function Products(){
    const { data: products, ...state } = useProducts();
    const { t } = useTranslation();
    console.log(products);
    return (
        <>
            <AdminHeader title={t("productsCatalog")} />
            <HeaderLink href="/admin/products/create" label={t("createProduct")} />
            <Wrapper {...state}>
                {
                    products && <ProductsTable products={products} />
                }
            </Wrapper>
        </>
    )
}

function Product(){
    const { id } = useParams();
    const { data: product, ...state } = useProduct(Number(id));
    const { mutate: edit, isLoading: isEditting } = useEditProduct();
    const { t } = useTranslation();
    console.log(product);
    const notfound = product && Array.isArray(product) && product.length === 0 ? 
    {   
        isError: true,
        error: new AppError("invalid product id! product not found", "NOT_FOUND")
    } : {};

    const handleFormSubmit = React.useCallback(
        product => {
            const formData = convertObjectToFormData(product, ["image"]);
            edit(formData);
        },
        []
    );

    return (
        <>
            <AdminHeader title={t("product")} />
            <Wrapper {...state} {...notfound}>
                {
                    product
                    &&
                    <ProductForm
                        initialProductData={product}
                        isSubmitting={isEditting}
                        submit={handleFormSubmit}
                        buttonLabel="Edit"
                    />
                }
            </Wrapper>
        </>
    )
}

function CreateProduct(){
    const { mutate: create, isLoading } = useCreateProduct();
    const { t } = useTranslation();

    const initialProductData = {
        name_ar: "",
        name_en: "",
        description_en: "",
        description_ar: "",
        price: "",
        status: "available",
        image: null
    };

    const handleFormSubmit = React.useCallback(
        product => {
            console.log(product);
            const formData = convertObjectToFormData(product, ["image"]);
            create(formData);
        },
        []
    );

    return (
        <>
            <AdminHeader title={t("createProduct")} /> 
            <ProductForm
                initialProductData={initialProductData}
                isSubmitting={isLoading}
                submit={handleFormSubmit}
                buttonLabel="Create"
            />
        </>
    )
}

const Wrapper = styled(AsyncContainer)`
    &.loading{
        height: 200px;
    }
`;

export {
    Products,
    Product,
    CreateProduct
}