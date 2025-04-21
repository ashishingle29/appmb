module.exports = {
  apps: [
    {
      name: "appmb",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
        NEXT_PUBLIC_SUPABASE_URL: "https://lwloylbshkexuocjswgr.supabase.co",
        NEXT_PUBLIC_SUPABASE_ANON_KEY:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3bG95bGJzaGtleHVvY2pzd2dyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0NzExOTUsImV4cCI6MjA1NjA0NzE5NX0.9O9jl3LnT2yNBpZHJc7pTbknoodOej8pik62AbeAlds",
        NEXT_PUBLIC_NODE_ENV: "production",
        // # production
        NEXT_PUBLIC_MONGODB_URI:
          "mongodb+srv://EduTechAshish:EduTechAshish@edutechhub.1vsmlfh.mongodb.net/appmb",
        NEXT_PUBLIC_NEXTAUTH_SECRET: "Ingle",
        // # NEXT_PUBLIC_SITE_URL=http://localhost:3000
        NEXT_PUBLIC_SITE_URL: "https://appmb.org.in",
      },
    },
  ],
};
