/** @type {import('next').NextConfig} */

import nextra from 'nextra';

const withNextra = nextra({
});

const nextConfig = {
    turbopack:{
        resolveAlias:{
            'next-mdx-import-source-file':"./mdx-components.tsx"
        }
    }
};

export default withNextra(nextConfig);
