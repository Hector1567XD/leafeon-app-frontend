import { FunctionComponent, useCallback } from "react";
import Table from "./table";
import usePaginate from "./use-paginate";
import { useNavigate } from "react-router";
import { styled } from "styled-components";
import { IconCirclePlus } from "@tabler/icons";
import MainCard from "components/cards/MainCard";
import { Button, Typography } from "@mui/material";

const BillsPage: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const { bills, paginate, setPage, fetchBills } = usePaginate();
  const goToCreate = useCallback(() => {
    navigate("/bills/create");
  }, [navigate]);

  return (
    <MainCard
      className={className}
      headerClass={"page-header"}
      title={
        <div className={"page-header"}>
          <Typography variant="h3" className={"title-header"}>
            Facturas
          </Typography>
          <Button
            color="primary"
            variant={"outlined"}
            onClick={goToCreate}
            startIcon={<IconCirclePlus />}
          >
            Crear
          </Button>
        </div>
      }
    >
      <Table
        items={bills}
        paginate={paginate}
        onChange={setPage}
        fetchItems={fetchBills}
      />
    </MainCard>
  );
};

interface Props {
  className?: string;
}

export default styled(BillsPage)`
  width: 100%;
  display: flex;
  flex-direction: column;

  .page-header {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`;
