import { Bill } from "core/bills/types";
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
import deleteBill from "services/bills/delete-bill";
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
  const [billId, setCurrentBillId] = useState<number>(0);

  const handleOpen = useCallback((billId: number) => {
    setOpen(true);
    setCurrentBillId(billId);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setCurrentBillId(0);
  }, []);

  const onDelete = useCallback(
    async (billId: number) => {
      try {
        dispatch(setIsLoading(true));
        await deleteBill(billId!);
        dispatch(setSuccessMessage(`Factura eliminada correctamente`));
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
  console.log('aa', items);
  return (
    <div className={className}>
      <DynamicTable
        headers={[
          {
            columnLabel: "Id",
            fieldName: "billId",
            cellAlignment: "left",
          },
          {
            columnLabel: "Coste",
            cellAlignment: "left",
            onRender: (row: Bill) => row.totalCost ? (+row.totalCost).toFixed(2) + ' $' : ''
          },
          {
            columnLabel: "Descuento",
            cellAlignment: "left",
            onRender: (row: Bill) => (row.discountValue + ' %')
          },
          {
            columnLabel: "Coste total",
            cellAlignment: "left",
            onRender: (row: Bill) => row.totalCostFinal ? (row.totalCostFinal).toFixed(2) + ' $' : ''
          },
          {
            columnLabel: "Orden",
            fieldName: "orderId",
            cellAlignment: "left",
          },
          {
            columnLabel: "Fecha de emision",
            fieldName: "billDate",
            cellAlignment: "left",
          },
        ]}
        rows={items}
        components={[
          (row: Bill) => (
            <Button
              color="secondary"
              onClick={() => handleOpen(row.billId)}
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
          onDelete(billId);
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
  items: Bill[];
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
