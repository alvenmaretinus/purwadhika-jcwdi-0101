-- CreateTable
CREATE TABLE "public"."Manager" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "branchId" INTEGER NOT NULL,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Manager_branchId_key" ON "public"."Manager"("branchId");

-- AddForeignKey
ALTER TABLE "public"."Manager" ADD CONSTRAINT "Manager_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "public"."Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
