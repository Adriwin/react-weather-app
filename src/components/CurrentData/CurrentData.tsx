import type { ICurrentData } from '../../types';
import '../../styles/Colors.css';

export const CurrentData = ({ currentData }: { currentData: ICurrentData }) => {
  return (
    <div>
      <h2 className="custom-gray">Today</h2>
      <div className="flex flex-row">
        <div>Today summary</div>
        <div>Today's highlights</div>
      </div>
    </div>
  );
};
