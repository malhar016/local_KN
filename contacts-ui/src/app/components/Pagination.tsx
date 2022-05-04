import { useState } from "react";

type PaginationProps = {
  range: number;
  current: number;
  triggerChange: any;
  footerClass: string;
};
export const Pagination = (props: PaginationProps) => {
  const {range, current, triggerChange, footerClass} = props;
  const start = Math.floor(current/3)*3;
  const visibleRange = Math.min(range, 3);
  const pageButtons: number[] = new Array(visibleRange).fill(0).map((x, id) => start + id);
  const isFirst = current === 0;
  const isLast = current === range - 1;
  return (
    <div className={footerClass}>
      <button disabled={isFirst} onClick={() => triggerChange({type: 'prev'})} className="mybtn pagebtn">Prev</button>
      {pageButtons.map((pageNo) => {
          const isSelected = pageNo === current ? "btnSelected": "";
          return <button key={pageNo} onClick={() => triggerChange({type: 'goto', payload: pageNo})}  className={`mybtn pagebtn ${isSelected}`}>{pageNo + 1}</button>
        })}
      <button disabled={isLast} onClick={() => triggerChange({type: 'next'})} className="mybtn pagebtn">Next</button>
    </div>
  );
};

/*
0 123 /3 = 0
1 123 /3
2 123 /3
3 456 /3 = 1*3 = 3
4 456
5 456
6 789

*/