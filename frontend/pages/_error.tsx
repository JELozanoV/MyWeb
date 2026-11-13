import { NextPage, NextPageContext } from 'next';

const Error: NextPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-fg mb-4">Oops!</h1>
        <p className="text-lg text-muted">Something went wrong. Please try again later.</p>
      </div>
    </div>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;