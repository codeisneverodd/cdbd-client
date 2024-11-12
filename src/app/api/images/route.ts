import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import prisma from '@/lib/database'
import { auth } from '@/auth'

export async function GET(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const images = await prisma.asset.findMany(
        {
            where: {
                ownerId: session?.user?.id
            }
        }
    )

    const client = new S3Client({ region: process.env.AWS_REGION!, credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    } })

    // get presigned urls and add to images
    const presignedImages = await Promise.all(images.map(async (image) => {
        const presignedUrl = await getSignedUrl(client, new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: image.id,
        }), { expiresIn: 60 * 60 * 24 * 7 });
        return { ...image, url: presignedUrl }
    }))

    return Response.json({ images: presignedImages })
  } catch (error:any) {
    return Response.json({ error: error?.message })
  }
}
