<<<<<<< HEAD
import type { CalculatedColumn, ColSpanArgs, RowSpanArgs } from '../types';
=======
import type { CalculatedColumn, CalculatedColumnOrColumnGroup } from '../types';

>>>>>>> ee67c19256aa837a02149140b22fd69b34ff7e23
export * from './colSpanUtils';
export * from './domUtils';
export * from './eventUtils';
export * from './keyboardUtils';
export * from './renderMeasuringCells';
export * from './selectedCellUtils';
export * from './styleUtils';

export const { min, max, round, floor, sign, abs } = Math;

export function assertIsValidKeyGetter<R, K extends React.Key>(
  keyGetter: unknown
): asserts keyGetter is (row: R) => K {
  if (typeof keyGetter !== 'function') {
    throw new Error('Please specify the rowKeyGetter prop to use selection');
  }
}

export function clampColumnWidth<R, SR>(
  width: number,
  { minWidth, maxWidth }: CalculatedColumn<R, SR>
): number {
  width = max(width, minWidth);

  // ignore maxWidth if it less than minWidth
  if (typeof maxWidth === 'number' && maxWidth >= minWidth) {
    return min(width, maxWidth);
  }

  return width;
}
<<<<<<< HEAD
export function getRowSpan<R, SR>(
  column: CalculatedColumn<R, SR>,
  lastFrozenColumnIndex: number,
  args: RowSpanArgs<R, SR>
): number[] | undefined {
  const rowSpan = typeof column.rowSpan === 'function' ? column.rowSpan(args) : undefined;
  if (rowSpan && Array.isArray(rowSpan)) {
    return rowSpan;
  }
  return undefined;
=======

export function getHeaderCellRowSpan<R, SR>(
  column: CalculatedColumnOrColumnGroup<R, SR>,
  rowIdx: number
) {
  return column.parent === undefined ? rowIdx : column.level - column.parent.level;
>>>>>>> ee67c19256aa837a02149140b22fd69b34ff7e23
}
