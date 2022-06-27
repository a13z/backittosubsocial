
import React from 'react';

const Page: React.FC<{ children: React.ReactNode }>  = ({ children }) => <>{children}</>;

const NextLayout: React.FC<{ children: React.ReactNode }>  = (props) => {
  return <Page {...props} />;
};

export default NextLayout;
