import Table from "components/lib/Table";
import { useTranslation } from "react-i18next";
import { ViewProduct, DeleteProduct } from "./ProductActions";
import useTextMapper from "hooks/useTextMapper";

function ProductsTable({ products }){
    const { t } = useTranslation();
    const mapText = useTextMapper();
    const tableHead = [t("name"), t("description"), t("actions")];

    return (
        <Table list={products} tableHead={tableHead}>
            {
                slicedProducts => slicedProducts.map(product => (
                    <tr key={product.id}>
                        <td>{mapText(product, "name")}</td>
                        <td>{mapText(product, "description")}</td>
                        <td className="actions">
                            <ViewProduct to={`/admin/products/${product.id}`} />    
                            <DeleteProduct product={product} />                        
                        </td>
                    </tr>
                ))
            }
        </Table>
    )
}

export default ProductsTable;