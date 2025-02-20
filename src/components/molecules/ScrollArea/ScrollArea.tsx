import { ScrollArea as BaseUIScrollArea } from "@base-ui-components/react/scroll-area";

import "./ScrollArea.css";

type ScrollAreaProps = {
  children: React.ReactNode;
};

const ScrollArea = ({ children }: ScrollAreaProps) => {
  return (
    <BaseUIScrollArea.Root className="m-scrollarea">
      <BaseUIScrollArea.Viewport className="m-scrollarea__viewport">
        <div className="m-scrollarea__content">{children}</div>
      </BaseUIScrollArea.Viewport>
      <BaseUIScrollArea.Scrollbar className="m-scrollarea__scrollbar">
        <BaseUIScrollArea.Thumb className="m-scrollarea__scrollbar-thumb" />
      </BaseUIScrollArea.Scrollbar>
    </BaseUIScrollArea.Root>
  );
};

export default ScrollArea;
