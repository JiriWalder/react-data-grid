import type { CSSProperties } from 'react';
import clsx from 'clsx';

import type { CalculatedColumn } from '../types';
import { cellClassname, cellFrozenClassname, cellFrozenLastClassname } from '../style';

export function getRowStyle(rowIdx: number, height?: number): CSSProperties {
  if (height !== undefined) {
    return {
      '--rdg-grid-row-start': rowIdx,
      '--rdg-row-height': `${height}px`
    } as unknown as CSSProperties;
  }

  return { '--rdg-grid-row-start': rowIdx } as unknown as CSSProperties;
}
export function getRowHeaderStyle(rowIdx: number, height?: number): CSSProperties {
  if (height !== undefined) {
    return {
      '--rdg-grid-row-start': rowIdx,
      '--rdg-row-height': `${height}px`,
      '--rdg-header-row-start': `${(rowIdx - 1) * height}px`
    } as unknown as CSSProperties;
  }
  return {
    '--rdg-grid-row-start': rowIdx,
    '--rdg-header-row-start': `${(rowIdx - 1) * height}px`
  } as unknown as CSSProperties;
}
export function getCellStyle<R, SR>(
  column: CalculatedColumn<R, SR>,
  colSpan?: number,
  gridRowStart?: number | undefined,
  rowSpan?: number
): React.CSSProperties {
  let rowi;
  if (gridRowStart) rowi = gridRowStart;

  const style = {
    gridRowStart: rowSpan !== undefined ? `${rowi}` : undefined,
    gridRowEnd: rowSpan !== undefined ? `span ${rowSpan}` : undefined,
    gridColumnStart: column.idx + 1,
    gridColumnEnd: colSpan !== undefined ? `span ${colSpan}` : undefined,
    insetInlineStart: column.frozen ? `var(--rdg-frozen-left-${column.idx})` : undefined
  };
  return { ...style };
}

export function getCellClassname<R, SR>(
  column: CalculatedColumn<R, SR>,
  ...extraClasses: Parameters<typeof clsx>
): string {
  return clsx(
    cellClassname,
    {
      [cellFrozenClassname]: column.frozen,
      [cellFrozenLastClassname]: column.isLastFrozenColumn
    },
    ...extraClasses
  );
}
