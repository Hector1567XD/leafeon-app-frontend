import { FunctionComponent, useState } from "react";
import MainCard from "components/cards/MainCard";
import Table from "./table";
import usePaginate from "./use-paginate";
import { styled } from "styled-components";
import { Typography, FormControl, TextField } from "@mui/material";

const FrequentModelsByDatePage: FunctionComponent<Props> = ({ className }) => {
  const { bestSellingProducts, paginate, setPage } = usePaginate();

  const [dateStart, setDateStart] = useState<string>('')
  const [dateEnd, setDateEnd] = useState<string>('')
  console.log(JSON.stringify(bestSellingProducts));
  return (
    <MainCard
      className={className}
      headerClass={"page-header"}
      title={
        <div className={"page-header"}>
          <Typography variant="h3" className={"title-header"}>
            Atención de modelos por fecha
          </Typography>
          <FormControl className={"field-form-header-container"}>
            <TextField
              id="dateStart"
              label="Fecha inicio"
              variant="outlined"
              value={dateStart}
              helperText={""}
              error={false}
              name="name"
            />
          </FormControl>
          <FormControl className={"field-form-header-container"}>
            <TextField
              id="dateEnd"
              label="Fecha fin"
              variant="outlined"
              value={dateEnd}
              helperText={""}
              error={false}
              name="name"
            />
          </FormControl>
        </div>
      }
    >
      <Table
        items={bestSellingProducts}
        paginate={paginate}
        onChange={setPage}
      />
    </MainCard>
  );
};

interface Props {
  className?: string;
}

export default styled(FrequentModelsByDatePage)`
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
