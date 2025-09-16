import * as React from 'react';

interface TabsProps {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
}

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ defaultValue, className = '', children }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <div className={className} data-active-tab={activeTab}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            activeTab,
            setActiveTab,
          });
        }
        return child;
      })}
    </div>
  );
};

export const TabsList: React.FC<TabsListProps> = ({ className = '', children }) => {
  return (
    <div className={`flex space-x-2 border-b ${className}`}>
      {children}
    </div>
  );
};

export const TabsTrigger: React.FC<TabsTriggerProps & { activeTab?: string; setActiveTab?: (value: string) => void }> = ({
  value,
  activeTab,
  setActiveTab,
  children
}) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium transition-colors
        ${activeTab === value
          ? 'border-b-2 border-red-900 text-red-900'
          : 'text-gray-500 hover:text-gray-700'
        }`}
      onClick={() => setActiveTab?.(value)}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps & { activeTab?: string }> = ({
  value,
  activeTab,
  children
}) => {
  if (activeTab !== value) return null;
  return <div>{children}</div>;
};