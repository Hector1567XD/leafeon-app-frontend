import { SupplyLine } from "core/supply-lines/types";
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
import deleteSupplyLine from "services/supply-lines/delete-supply-line";
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
  const [supplyLineId, setCurrentSupplyLineId] = useState<number>(0);

  const handleOpen = useCallback((supplyLineId: number) => {
    setOpen(true);
    setCurrentSupplyLineId(supplyLineId);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setCurrentSupplyLineId(0);
  }, []);

  const onDelete = useCallback(
    async (supplyLineId: number) => {
      try {
        dispatch(setIsLoading(true));
        await deleteSupplyLine(supplyLineId!);
        dispatch(setSuccessMessage(`Linea de suministro eliminada correctamente`));
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
            fieldName: "supplyLineId",
            cellAlignment: "left",
          },
          {
            columnLabel: "Nombre",
            fieldName: "name",
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
          (row: SupplyLine) => (
            <Button
              color="primary"
              onClick={() => {
                navigate("/supply-lines/edit/" + row.supplyLineId);
              }}
              startIcon={<IconEdit />}
            >
              Editar
            </Button>
          ),
          (row: SupplyLine) => (
            <Button
              color="secondary"
              onClick={() => handleOpen(row.supplyLineId)}
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
          onDelete(supplyLineId);
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
  items: SupplyLine[];
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
