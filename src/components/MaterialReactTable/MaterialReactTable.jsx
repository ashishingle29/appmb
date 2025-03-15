import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

export default function CommonMaterialReactTable({ columns, data }) {

  //pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    // enableRowSelection: true, //enable some features
    // enableColumnOrdering: true, //enable a feature for all columns
    // enableGlobalFilter: false, //turn off a feature
  });

  //note: you can also pass table options as props directly to <MaterialReactTable /> instead of using useMaterialReactTable
  //but the useMaterialReactTable hook will be the most recommended way to define table options
  return <MaterialReactTable table={table} />;
}
