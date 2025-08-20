/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://auapqvxdhucnptiarypd.supabase.co/storage/v1/object/public/books//**"
      ),
    ],
  },
};

export default nextConfig;
