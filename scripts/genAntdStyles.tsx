import fs from 'fs';

import { extractStyle } from '@ant-design/static-style-extract';

const outputPath = './app/styles/antd.min.css';

fs.writeFileSync(outputPath, extractStyle());