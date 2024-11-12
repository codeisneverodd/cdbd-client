import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { S3Client } from '@aws-sdk/client-s3'
import prisma from '@/lib/database'
import { auth } from '@/auth'

export async function POST(request: Request) {
  const all= await request.json()
  const session = await auth()
  
  if (!session?.user?.id) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { filename, contentType } = all


  // save asset to db
  const newAsset = await prisma.asset.create({
    data: {
      name: filename,
      type: contentType,
      assetType: "image",
      ownerId: session?.user?.id
    }
  })

  try {
    const client = new S3Client({ region: process.env.AWS_REGION!, credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    } })

    const result = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: newAsset.id,
      Conditions: [
        ['content-length-range', 0, 10485760], // up to 10 MB
        ['starts-with', '$Content-Type', contentType],
      ],
      Fields: {
        // acl: 'public-read',
        'Content-Type': contentType,
      },
      Expires: 600, // Seconds before the presigned post expires. 3600 by default.
    })

    const { url, fields } = result


    return Response.json({ url, fields })
  } catch (error:any) {
    return Response.json({ error: error?.message })
  }
}
