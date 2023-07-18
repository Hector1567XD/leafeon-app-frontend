import { Discount } from "core/discounts/types";
import { Button, Pagination } from "@mui/material";
import DynamicTable from "components/DynamicTable";
import styled from "styled-components";
// Own
import { useAppDispatch } from "../../store/index";
import {
  setIsLoading,
  setSuccessMessage,
  setErrorMessage,
} from "store/customizationSlice";
import BackendError from "exceptions/backend-error";
import deleteDiscount from "services/discounts/delete-discount";
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
  const [discountId, setCurrentDiscountId] = useState<number>(0);

  const handleOpen = useCallback((discountId: number) => {
    setOpen(true);
    setCurrentDiscountId(discountId);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setCurrentDiscountId(0);
  }, []);

  const onDelete = useCallback(
    async (discountId: number) => {
      try {
        dispatch(setIsLoading(true));
        await deleteDiscount(discountId!);
        dispatch(setSuccessMessage(`Descuento eliminado correctamente`));
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
          {
            columnLabel: "Id",
            fieldName: "discountId",
            cellAlignment: "left",
          },
          {
            columnLabel: "RIF Agencia",
            fieldName: "agencyRif",
            cellAlignment: "left",
          },
          {
            columnLabel: "Porcentaje",
            cellAlignment: "left",
            onRender: (row: Discount) => row.percentage + "%",
          },
          {
            columnLabel: "Minimo",
            fieldName: "servicesMin",
            cellAlignment: "left",
          },
          {
            columnLabel: "Maximo",
            fieldName: "servicesMax",
            cellAlignment: "left",
          },
          {
            columnLabel: "Fecha de creacion",
            fieldName: "createdAt",
            cellAlignment: "left",
          },
        ]}
        rows={items}
        components={[
          (row: Discount) => (
            <Button
              color="primary"
              onClick={() => {
                navigate("/discounts/edit/" + row.discountId);
              }}
              startIcon={<IconEdit />}
            >
              Editar
            </Button>
          ),
          (row: Discount) => (
            <Button
              color="secondary"
              onClick={() => handleOpen(row.discountId)}
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
          onDelete(discountId);
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
  items: Discount[];
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
