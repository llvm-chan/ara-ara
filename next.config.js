module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  modularizeImports: {
    "@mui/material": {
      transform: "@mui/material/{{member}}"
    },
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}"
    },
    "@mui/styles": {
      transform: "@mui/styles/{{member}}"
    },
    "@mui/lab": {
      transform: "@mui/lab/{{member}}"
    }
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: "/api/v1/:path*",
          destination: "http://localhost:3001/api/v1/:path*"
        }
      ]
    }
  }
}