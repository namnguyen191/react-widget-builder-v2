import React, { PropsWithChildren, useEffect } from 'react';

export type PageProps = {
  title: string;
};

const Page: React.FC<PropsWithChildren<PageProps>> = (props) => {
  const { title, children } = props;

  useEffect(() => {
    document.title = title;
  }, [title]);

  return children;
};
export default Page;
