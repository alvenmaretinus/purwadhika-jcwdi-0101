/*
  Warnings:

  - You are about to drop the column `articleId` on the `User` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_articleId_fkey";

-- DropIndex
DROP INDEX "public"."Comment_articleId_key";

-- DropIndex
DROP INDEX "public"."Comment_userId_key";

-- DropIndex
DROP INDEX "public"."User_articleId_key";

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "authorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "articleId";

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
