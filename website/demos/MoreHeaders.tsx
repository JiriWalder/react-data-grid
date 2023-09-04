import { useMemo } from 'react';
import { css } from '@linaria/core';

import DataGrid from '../../src';
import type { Column, FormatterProps } from '../../src';
import type { Props } from './types';
import React from 'react';

type Row = number;
const rows: readonly Row[] = [...Array(30).keys()];

const colSpanClassname = css`
  background-color: #ffb300;
  color: black;
  text-align: center;
`;

function CellFormatter(props: FormatterProps<Row>) {
  return (
    <>
      {props.column.key}&times;{props.row}
    </>
  );
}

export default function MoreHeaders({ direction }: Props) {
  const columns = useMemo((): readonly Column<Row>[] => {
    const columns: Column<Row>[] = [];

    for (let i = 0; i < 30; i++) {
      const key = String(i);
      columns.push({
        key,
        name: [`Master ${key}`, `Head ${key}`],
        frozen: i < 5,
        resizable: true,
        formatter: CellFormatter,
        colSpan(args) {
          if (args.type === 'ROW') {
            if (key === '1' && args.row === 0) return 3;
          }
          if (args.type === 'HEADER' && key === '0') {
            return 3;
          }
          return undefined;
        },
        rowSpan(args) {
          if (args.type === 'ROW') {
            if (key === '0' && args.row === 2) {
              return [1, 3]; //1 je prvni ktery se vykresli, >1 se nevykresli budou spanovane
            }
            if (key === '0' && args.row === 3) {
              return [2, 3];
            }
            if (key === '0' && args.row === 4) {
              return [3, 3];
            }
          }
          /* if (args.type === 'HEADER') {
            if (key === '0' && args.row === 1) {
              return [1, 2]; //1 je prvni ktery se vykresli, >1 se nevykresli budou spanovane
            }
            if (key === '0' && args.row === 2) {
              return [2, 2];
            }
          }*/
          return undefined;
        },
        cellClass(row) {
          if (key === '1' && row === 0) {
            return colSpanClassname;
          }
        }
      });
    }

    return columns;
  }, []);

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      rowHeight={22}
      className="fill-grid"
      direction={direction}
      headerLines={2}
    />
  );
}
