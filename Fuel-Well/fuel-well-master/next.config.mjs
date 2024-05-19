import { configDotenv } from 'dotenv';
import { dot } from 'node:test/reporters';

/** @type {import('next').NextConfig} */
const nextConfig = {};
configDotenv({ path: './.env'});
export default nextConfig;
