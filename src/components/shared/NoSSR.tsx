import dynamic from 'next/dynamic';
import React, { PropsWithChildren } from 'react';

const NoSsr = (props: PropsWithChildren<any>) => (
  <React.Fragment>{props.children}</React.Fragment>
);

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
});
