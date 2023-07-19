import DynamicTable from "components/DynamicTable";
import styled from "styled-components";
// Own
import { FunctionComponent } from "react";
import { NoEcoProductsItem } from "./use-no-eco-products";

const Table: FunctionComponent<Prop> = ({ items, className }) => {
  return (
    <div className={className}>
      <DynamicTable
        headers={[
          {
            columnLabel: "Tipo",
            fieldName: "label",
            cellAlignment: "left",
          },
          {
            columnLabel: "Porcentaje",
            cellAlignment: "left",
            onRender: (row: NoEcoProductsItem) => row.value + "%",
          },
        ]}
        rows={items}
        components={[]}
      />
    </div>
  );
};

interface Prop {
  items: NoEcoProductsItem[];
  className?: string;
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
