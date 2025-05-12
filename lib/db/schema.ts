import {pgTable,text,uuid,integer,boolean,timestamp, PgUpdateBase} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";

export const files = pgTable("files", {
    id: uuid("id").defaultRandom().primaryKey(),
    //basic file/folder information
    name: text("name").notNull(),
    path: text("path").notNull(), // document/projects/resume.pdf
    size: integer("size").notNull(),
    type: text("type").notNull(), //"folder" | "file"

    //storage information
    fileUrl: text("file_url").notNull(), // url to access the file
    thumbnailUrl: text("thumbnail_url"),

    // Ownership
    userId: uuid("user_id").notNull(),
    parentId: uuid("parent_id"), // id of the parent folder and null if it is a root folder

    //file/folder flags
    isFolder: boolean("is_folder").notNull().default(false),
    isStarred: boolean("is_starred").notNull().default(false),
    isTrash: boolean("is_trash").notNull().default(false),

    //Timestamps
    createdAt:timestamp("created_at").notNull().defaultNow(),
    updatedAt:timestamp("updated_at").notNull().defaultNow(),
})

/*
parent: Each file/folder can have one parent folder
children: Each folder can have many children files/folders
*/

export const filesRelations = relations(files, ({one,many}) => ({
    parent: one(files, {
        fields: [files.parentId],
        references: [files.id],
    }),
    //relationship to child file/folder
    children: many(files)
}))


//Type definition

export const File = typeof files.$inferSelect;
export const NewFile = typeof files.$inferInsert;