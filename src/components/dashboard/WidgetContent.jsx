import React from 'react';
import { WidgetTypes } from './widgets/WidgetTypes';

// Import widget components
import { CalendarWidget } from './widgets/CalendarWidget';
import { TasksWidget } from './widgets/TasksWidget';
import { BudgetWidget } from './widgets/BudgetWidget';
import { GuestListWidget } from './widgets/GuestListWidget';
import { TimelineWidget } from './widgets/TimelineWidget';

export const WidgetContent = ({ widget }) => {
  const { type, config } = widget;
  
  const renderWidget = () => {
    switch (type) {
      case WidgetTypes.CALENDAR:
        return <CalendarWidget config={config} />;
      case WidgetTypes.TASKS:
        return <TasksWidget config={config} />;
      case WidgetTypes.BUDGET:
        return <BudgetWidget config={config} />;
      case WidgetTypes.GUEST_LIST:
        return <GuestListWidget config={config} />;
      case WidgetTypes.TIMELINE:
        return <TimelineWidget config={config} />;
      default:
        return <div>Widget no soportado: {type}</div>;
    }
  };
  
  return (
    <div className="h-full">
      {renderWidget()}
    </div>
  );
};
