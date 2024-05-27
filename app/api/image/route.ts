import { NextApiHandler, NextApiRequest } from "next";
import formidable from "formidable";
import { join } from "path";
import fs, { writeFile, rm } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import mime from "mime";

const pathPublic = "/public";
const pathProfile = "/images/profiles";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function POST(req: NextRequest) {
  try {
    const relativeUploadDir = join(pathPublic, pathProfile);
    try {
      await fs.readdir(join(process.cwd() + relativeUploadDir));
    } catch (error) {
      await fs.mkdir(join(process.cwd() + relativeUploadDir));
    }
    const data = await req.formData();
    const file = (data.get("image") as File) || null;

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${uuidv4()}.${mime.getExtension(file.type)}`;

    const uploadDir = join(process.cwd(), relativeUploadDir);
    await writeFile(`${uploadDir}/${filename}`, buffer);

    const image = await prisma?.image.create({
      data: {
        filename: filename,
        imageFullUrl: join(pathProfile, "/"),
        imageThumbUrl: join(pathProfile, "/"),
      },
    });

    return NextResponse.json({ image });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") ?? "";

    const image = await prisma?.image.findUnique({
      where: { id: id },
    });

    if (image) {
      await prisma?.image.deleteMany({
        where: { id: id },
      });

      const filePath = join(
        process.cwd(),
        pathPublic,
        image?.imageFullUrl!,
        "/",
        image?.filename!
      );

      try {
        const file = await fs.readFile(filePath);
      } catch (error) {
        return NextResponse.json(
          { message: "File not exits." },
          { status: 500 }
        );
      }

      await rm(filePath);
    }
    
    return NextResponse.json({ image });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
