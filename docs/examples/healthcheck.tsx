import { GetServerSideProps } from 'next';

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.end('OK');
  return {
    props: {
    },
  };
};

const healthCheck = (): React.ReactNode => null;

export default healthCheck;
