import React, { useState } from 'react';

interface TabsProps {
  children: React.ReactNode;
}

interface TabProps {
  title: string;
  children: React.ReactNode;
}

export const Tab: React.FC<TabProps> = ({ children }) => <>{children}</>;

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabsArray = React.Children.toArray(children) as React.ReactElement<TabProps>[];

  return (
    <div className="w-full">
      <div className="border-b border-slate-700">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {tabsArray.map((child, index) => (
            <button
              key={child.props.title}
              onClick={() => setActiveTab(index)}
              className={`${
                activeTab === index
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors focus:outline-none`}
              aria-current={activeTab === index ? 'page' : undefined}
            >
              {child.props.title}
            </button>
          ))}
        </nav>
      </div>
      <div className="pt-8">
        {tabsArray[activeTab]}
      </div>
    </div>
  );
};
