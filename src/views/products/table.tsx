import { Button, Pagination } from "@mui/material";
import DynamicTable from "components/DynamicTable";
import { Product } from "core/products/types";
import styled from "styled-components";
// Own
import { useAppDispatch } from "../../store/index";
import {
  setIsLoading,
  setSuccessMessage,
  setErrorMessage,
} from "store/customizationSlice";
import BackendError from "exceptions/backend-error";
import deleteProduct from "services/products/delete-product";
import { FunctionComponent, useCallback, useState } from "react";
import { PaginateData } from "services/types";
import { IconEdit, IconTrash } from "@tabler/icons";
import { useNavigate } from "react-router";
import DialogDelete from "components/dialogDelete";

const Table: FunctionComponent<Prop> = ({
  items,
  paginate,
  className,
  onChange,
  fetchItems,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [currentProductId, setCurrentProductId] = useState<number>(0);

  const handleOpen = useCallback((currentProductId: number) => {
    setOpen(true);
    setCurrentProductId(currentProductId);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setCurrentProductId(0);
  }, []);

  const onDelete = useCallback(
    async (productId: number) => {
      try {
        dispatch(setIsLoading(true));
        await deleteProduct(productId!);
        dispatch(setSuccessMessage(`Producto eliminado correctamente`));
      } catch (error) {
        if (error instanceof BackendError) {
          dispatch(setErrorMessage(error.getMessage()));
        }
      } finally {
        dispatch(setIsLoading(false));
        handleClose();
        fetchItems();
      }
    },
    [dispatch, fetchItems, handleClose]
  );

  return (
    <div className={className}>
      <DynamicTable
        headers={[
          { columnLabel: "Id", fieldName: "productId", cellAlignment: "left" },
          {
            columnLabel: "Nombre",
            fieldName: "shortNameProduct",
            cellAlignment: "left",
          },
          {
            columnLabel: "Precio",
            cellAlignment: "left",
            onRender: (row: Product) => row.price + "$",
          },
          {
            columnLabel: "Proveedor",
            fieldName: "provider",
            cellAlignment: "left",
          },
          {
            columnLabel: "Creación",
            fieldName: "createdAt",
            cellAlignment: "left",
          },
        ]}
        rows={items}
        components={[
          (row: Product) => (
            <Button
              color="primary"
              onClick={() => {
                navigate("/products/edit/" + row.productId);
              }}
              startIcon={<IconEdit />}
            >
              Editar
            </Button>
          ),
          (row: Product) => (
            <Button
              color="secondary"
              onClick={() => handleOpen(row.productId)}
              startIcon={<IconTrash />}
            >
              Eliminar
            </Button>
          ),
        ]}
      />
      <DialogDelete
        handleClose={handleClose}
        onDelete={() => {
          onDelete(currentProductId);
        }}
        open={open}
      />
      <div className={"paginator-container"}>
        <Pagination
          count={paginate.pages}
          page={paginate.page}
          variant="outlined"
          shape="rounded"
          color="primary"
          onChange={(event, page) => {
            onChange(page);
          }}
        />
      </div>
    </div>
  );
};

interface Prop {
  items: Product[];
  paginate: PaginateData;
  className?: string;
  onChange: (page: number) => void;
  fetchItems: () => void;
}

export default styled(Table)`
  display: flex;
  flex-direction: column;

  .paginator-container {
    margin-top: 12px;
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
`;
