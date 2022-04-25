import { NextApiHandler } from 'next';

import PackageJson from '../../package.json';
import binparWebViews from '../../src/utils/binparWebViews';
import getAllUrls from '../../src/utils/getAllUrls';

type Status = 'pass' | 'fail';

interface HealthcheckResponse {
  version: string;
  status: Status;
  output: string;
}

if (process.env.NODE_ENV === 'production') {
  getAllUrls()
    .then((urls) => {
      urls.forEach((url) => {
        binparWebViews?.inc({ url });
      });
    })
    .catch((err) => {
      console.warn(err);
    });
}

// eslint-disable-next-line @typescript-eslint/require-await
const healthcheck: NextApiHandler = async (_, res) => {
  const { version } = PackageJson;
  const response: HealthcheckResponse = {
    version,
    status: 'pass',
    output: '',
  };
  try {
    res.status(200).json(response);
  } catch (ex) {
    response.status = 'fail';
    const { stack, message } = ex as Error;
    response.output = stack || message;
    console.error(`Error at healthcheck: ${stack || message}`);
    res.status(500).end(stack || message);
  }
};

export default healthcheck;
