import { memo } from 'react';
import clsx from 'clsx';
import { css } from '@linaria/core';

import HeaderCell from './HeaderCell';
import type { CalculatedColumn, Direction } from './types';
import { getColSpan, getRowHeaderStyle } from './utils';
import type { DataGridProps } from './DataGrid';
import { cell, cellFrozen, rowSelectedClassname } from './style';

type SharedDataGridProps<R, SR, K extends React.Key> = Pick<
  DataGridProps<R, SR, K>,
  'sortColumns' | 'onSortColumnsChange'
>;

export interface HeaderRowProps<R, SR, K extends React.Key> extends SharedDataGridProps<R, SR, K> {
  rowIdx: number;
  columns: readonly CalculatedColumn<R, SR>[];
  allRowsSelected: boolean;
  onAllRowsSelectionChange: (checked: boolean) => void;
  onColumnResize: (column: CalculatedColumn<R, SR>, width: number | 'auto') => void;
  selectCell: (columnIdx: number) => void;
  lastFrozenColumnIndex: number;
  selectedCellIdx: number | undefined;
  shouldFocusGrid: boolean;
  direction: Direction;
  headerInx?: number | undefined;
  height?: number;
}

const headerRow = css`
  display: contents;
  line-height: var(--rdg-header-row-height);
  background-color: var(--rdg-header-background-color);
  font-weight: bold;

  > .${cell} {
    /* Should have a higher value than 1 to show up above frozen cells */
    z-index: 2;
    position: sticky;
    inset-block-start: var(--rdg-header-row-start, 0px);
  }

  > .${cellFrozen} {
    z-index: 3;
  }
`;

const headerRowClassname = `rdg-header-row ${headerRow}`;

function HeaderRow<R, SR, K extends React.Key>({
  rowIdx,
  columns,
  allRowsSelected,
  onAllRowsSelectionChange,
  onColumnResize,
  sortColumns,
  onSortColumnsChange,
  lastFrozenColumnIndex,
  selectedCellIdx,
  selectCell,
  shouldFocusGrid,
  direction,
 headerInx,
  height
}: HeaderRowProps<R, SR, K>) {
  const cells = [];
  for (let index = 0; index < columns.length; index++) {
    const column = columns[index];
    const colSpan = getColSpan(column, lastFrozenColumnIndex, { type: 'HEADER', headerInx });
    if (colSpan !== undefined) {
      index += colSpan - 1;
    }

    cells.push(
      <HeaderCell<R, SR>
        key={column.key}
        column={column}
        colSpan={colSpan}
        rowIdx={rowIdx}
        isCellSelected={selectedCellIdx === column.idx}
        onColumnResize={onColumnResize}
        allRowsSelected={allRowsSelected}
        onAllRowsSelectionChange={onAllRowsSelectionChange}
        onSortColumnsChange={onSortColumnsChange}
        sortColumns={sortColumns}
        selectCell={selectCell}
        shouldFocusGrid={shouldFocusGrid && index === 0}
        direction={direction}
        headerInx={headerInx}
      />
    );
  }

  return (
    <div
      role="row"
      aria-rowindex={1} // aria-rowindex is 1 based
      aria-rowindex={headerInx} // aria-rowindex is 1 based
      className={clsx(headerRowClassname, {
        [rowSelectedClassname]: selectedCellIdx === -1
      })}
      style={getRowHeaderStyle(headerInx, height)}
    >
      {cells}
    </div>
  );
}

export default memo(HeaderRow) as <R, SR, K extends React.Key>(
  props: HeaderRowProps<R, SR, K>
) => JSX.Element;
