import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import {multiTenantPlugin} from "@payloadcms/plugin-multi-tenant";

import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./src/collections/Users";
import { Media } from "./src/collections/Media";
import {Categories} from "./src/collections/Categories"
import { Products } from "./src/collections/Products";
import { Tags } from "./src/collections/Tags";
import { Tenants } from "./src/collections/Tenants";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media,Categories,Products,Tags,Tenants],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || "",
  }),
  sharp,
  plugins: [
    multiTenantPlugin({
      tenantsSlug:"tenants",
      collections:{
        products:{},
      },
      tenantsArrayField:{
        includeDefaultField:false,
      },
      userHasAccessToAllTenants: (user)=> Boolean(user?.roles?.includes("super-admin"))
    }),
  ],
});
