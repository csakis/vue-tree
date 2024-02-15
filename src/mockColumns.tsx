import { createColumnHelper } from "@tanstack/vue-table";
import IndeterminateCheckbox from "@/IndeterminateCheckbox.vue";

const columnHelper = createColumnHelper<Person>();
export const mockColumns = [
  {
    id: "select",
    header: ({ table }: { table: any }) => {
      return (
        <>
        <div className="flex align-items-center">

          <IndeterminateCheckbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onClick={table.getToggleAllRowsSelectedHandler()}
            ></IndeterminateCheckbox>{" "}
          <span
            {...{
              onClick: table.getToggleAllRowsExpandedHandler(),
            }}
            >
            {table.getIsAllRowsExpanded() ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
                >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M4.47 9.4a.75.75 0 0 1 1.06 0l6.364 6.364a.25.25 0 0 0 .354 0L18.612 9.4a.75.75 0 0 1 1.06 1.06l-6.364 6.364a1.75 1.75 0 0 1-2.475 0L4.47 10.46a.75.75 0 0 1 0-1.06"
                  clip-rule="evenodd"
                  />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 256 256"
                >
                <path
                  fill="currentColor"
                  d="m181.66 133.66l-80 80a8 8 0 0 1-11.32-11.32L164.69 128L90.34 53.66a8 8 0 0 1 11.32-11.32l80 80a8 8 0 0 1 0 11.32"
                  />
              </svg>
            )}
          </span>{" "}
          First Name
            </div>
        </>
      );
    },
    cell: ({ row, getValue }: { row: any }) => {
      return (
        <div
        className="align-items-center"
        style={{
          // Since rows are flattened by default,
          // we can use the row.depth property
          // and paddingLeft to visually indicate the depth
          // of the row
          paddingLeft: `${(row.depth * 2+1)}rem`,
          display: 'flex'

        }}
      >
        <>
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />{' '}
          {row.getCanExpand() ? (
            <span
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: { cursor: 'pointer' },
              }}
            >
              {row.getIsExpanded() ?  <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="m216.49 104.49l-80 80a12 12 0 0 1-17 0l-80-80a12 12 0 0 1 17-17L128 159l71.51-71.52a12 12 0 0 1 17 17Z"
              />
            </svg> :  <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="m184.49 136.49l-80 80a12 12 0 0 1-17-17L159 128L87.51 56.49a12 12 0 1 1 17-17l80 80a12 12 0 0 1-.02 17"
              />
            </svg>}
            </span>
          ) : (
            <span style={{ width: '1rem' }} />
          )}{' '}
          {getValue()}
        </>
      </div>
      );
    },
  },

  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lastName", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("age", {
    header: () => "Age",
  }),

  columnHelper.accessor("status", {
    header: () => "Status",
  }),
  columnHelper.accessor("visits", {
    header: "Visits",
  }),
];
