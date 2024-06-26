import { NextApiHandler, NextApiRequest } from "next";
import formidable from "formidable";
import { join } from "path";
import fs, { writeFile, rm } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import mime from "mime";
import prismadb from "@/lib/prismadb";
import { Image } from "@prisma/client";
import axios from "axios";

// const pathPublic = "D:/Khonmai";
const pathPublic = "/public";
const pathProfile = "/images/profiles/";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") ?? undefined;

    const image = await prismadb?.image.findUnique({
      where: { id: id },
    });
    console.log(id);

    const filePath = join(
      pathPublic,
      image?.imageFullUrl!,
      "/",
      image?.filename!
    );
    const file = await fs.readFile(filePath);

    return NextResponse.json(file);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file = (data.get("image") as File) || null;
    const filename = `${uuidv4()}.${mime.getExtension(file.type)}`;

    var formData = new FormData();
    formData.append("image", file);
    formData.append("name", filename);
    await axios.post("http://localhost:8081/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const image = await prismadb?.image.create({
      data: {
        filename: filename,
        imageFullUrl: pathProfile,
        imageThumbUrl: pathProfile,
      },
    });

    return NextResponse.json({ image });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

// export async function POST(req: NextRequest) {
//   try {
//     const relativeUploadDir = join(pathPublic, pathProfile);
//     try {
//       await fs.readdir(join(process.cwd() + relativeUploadDir));
//     } catch (error) {
//       await fs.mkdir(join(process.cwd() + relativeUploadDir));
//     }
//     const data = await req.formData();
//     const file = (data.get("image") as File) || null;

//     const buffer = Buffer.from(await file.arrayBuffer());
//     const filename = `${uuidv4()}.${mime.getExtension(file.type)}`;

//     const uploadDir = join(process.cwd(), relativeUploadDir);
//     await writeFile(`${uploadDir}/${filename}`, buffer);

//     const image = await prismadb?.image.create({
//       data: {
//         filename: filename,
//         imageFullUrl: join(pathProfile, "/"),
//         imageThumbUrl: join(pathProfile, "/"),
//       },
//     });

//     return NextResponse.json({ image });
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }

// export async function DELETE(req: NextRequest) {
//   try {
//     const id = req.nextUrl.searchParams.get("id") ?? "";

//     if (id) {
//       const image = await deleteImage(id);

//       return NextResponse.json({ image });
//     }

//     return NextResponse.json({ image: "Image not found!" });
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }

// export async function deleteImage(id: string) {
//   try {
//     const image = await prismadb?.image.findUnique({
//       where: { id: id },
//     });

//     if (image) {
//       await prismadb?.image.deleteMany({
//         where: { id: image.id },
//       });

//       const filePath = join(
//         process.cwd(),
//         pathPublic,
//         image?.imageFullUrl!,
//         "/",
//         image?.filename!
//       );

//       try {
//         await fs.readFile(filePath);
//       } catch (error) {
//         return { error: error };
//       }

//       await rm(filePath);
//     }
//   } catch (error) {
//     return { error: error };
//   }
//   return "success";
// }
