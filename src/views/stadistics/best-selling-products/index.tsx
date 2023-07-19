import { FunctionComponent } from "react";
import MainCard from "components/cards/MainCard";
import Table from "./table";
import usePaginate from "./use-paginate";
import { styled } from "styled-components";
import { Typography } from "@mui/material";

const BestSellingProductsPage: FunctionComponent<Props> = ({ className }) => {
  const { bestSellingProducts, paginate, setPage } = usePaginate();

  console.log(JSON.stringify(bestSellingProducts))
  return (
    <MainCard
      className={className}
      headerClass={"page-header"}
      title={
        <div className={"page-header"}>
          <Typography variant="h3" className={"title-header"}>
            Productos más vendidos
          </Typography>
        </div>
      }
    >
      <Table items={bestSellingProducts} paginate={paginate} onChange={setPage} />
    </MainCard>
  );
};

interface Props {
  className?: string;
}

export default styled(BestSellingProductsPage)`
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
