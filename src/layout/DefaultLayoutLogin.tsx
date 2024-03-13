import { ReactNode } from 'react';
import * as React from 'react';


const DefaultLayoutLogin: React.FC<{ children: ReactNode }> = ({ children }) => {


  return (
      <div className=" dark:bg-boxdark-2 dark:text-bodydark">
            <main>
                {children}
            </main>
      </div>
  );
};

export default DefaultLayoutLogin;