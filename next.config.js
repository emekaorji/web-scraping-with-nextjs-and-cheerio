/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	async rewrites() {
		return [
			{
				source: '/api',
				destination: 'https://www.flexjobs.com',
			},
		];
	},
};

module.exports = nextConfig;
