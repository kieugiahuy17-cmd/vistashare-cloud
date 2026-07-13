require("dotenv").config();

const path = require("path");
const crypto = require("crypto");
const express = require("express");
const multer = require("multer");

const {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  HeadObjectCommand,
  DeleteObjectCommand
} = require("@aws-sdk/client-s3");

const {
    getSignedUrl
} = require("@aws-sdk/s3-request-presigner");

const app = express();
const port = process.env.PORT || 4000;

/*
 * 1. Kiểm tra biến môi trường
 */
const requiredEnvironmentVariables = [
    "AWS_REGION",
    "AWS_S3_BUCKET",
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY"
];

for (const variableName of requiredEnvironmentVariables) {
    if (!process.env[variableName]) {
        console.error(`Thiếu biến môi trường: ${variableName}`);
        process.exit(1);
    }
}

/*
 * 2. Khởi tạo kết nối Amazon S3
 */
const s3Client = new S3Client({
    region: process.env.AWS_REGION,

    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

/*
 * 3. Cấu hình upload ảnh
 */
const allowedMimeTypes = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif"
]);

const upload = multer({
    storage: multer.memoryStorage(),

    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter: (request, file, callback) => {
        if (!allowedMimeTypes.has(file.mimetype)) {
            return callback(
                new Error(
                    "Chỉ chấp nhận ảnh JPG, PNG, WEBP hoặc GIF."
                )
            );
        }

        callback(null, true);
    }
});

/*
 * 4. Middleware Express
 */
app.use(express.json());

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);

/*
 * 5. API kiểm tra server
 */
app.get("/api/health", (request, response) => {
    response.json({
        success: true,
        message: "Server VistaShare đang hoạt động.",
        bucket: process.env.AWS_S3_BUCKET,
        region: process.env.AWS_REGION
    });
});

/*
 * 6. API lấy danh sách ảnh từ S3
 */
app.get("/api/images", async (request, response, next) => {
    try {
        const listResult = await s3Client.send(
            new ListObjectsV2Command({
                Bucket: process.env.AWS_S3_BUCKET,
                Prefix: "images/"
            })
        );

        const objects = (listResult.Contents || [])
            .filter((object) => object.Key !== "images/")
            .sort((first, second) => {
                return (
                    new Date(second.LastModified) -
                    new Date(first.LastModified)
                );
            });

        const images = await Promise.all(
    objects.map(async (object) => {
        /*
         * ListObjectsV2 không trả về metadata tùy chỉnh.
         * Vì vậy phải gọi HeadObject cho từng ảnh.
         */
        const headResult = await s3Client.send(
            new HeadObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET,
                Key: object.Key
            })
        );

        const metadata = headResult.Metadata || {};

        const signedUrl = await getSignedUrl(
            s3Client,

            new GetObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET,
                Key: object.Key
            }),

            {
                expiresIn: 60 * 60
            }
        );

        return {
            key: object.Key,
            id: object.Key,

            name: decodeMetadata(
                metadata.originalname,
                getDisplayName(object.Key)
            ),

            title: decodeMetadata(
                metadata.title,
                getDisplayName(object.Key)
            ),

            category: decodeMetadata(
                metadata.category,
                "Đời sống"
            ),

            description: decodeMetadata(
                metadata.description,
                "Ảnh được lưu trữ trên Amazon S3."
            ),

            author: decodeMetadata(
                metadata.author,
                "VistaShare"
            ),

            owner: decodeMetadata(
                metadata.owner,
                ""
            ),

            url: signedUrl,
            src: signedUrl,
            imageUrl: signedUrl,

            size: object.Size || 0,
            lastModified: object.LastModified
        };
    })
);

        response.json({
            success: true,
            count: images.length,
            images
        });
    } catch (error) {
        next(error);
    }
});

/*
 * 7. API upload một ảnh lên S3
 *
 * Tên trường multipart phải là "image".
 */
app.post(
    "/api/images",
    upload.single("image"),
    async (request, response, next) => {
        try {
            if (!request.file) {
                return response.status(400).json({
                    success: false,
                    message: "Không tìm thấy file ảnh."
                });
            }

            const extension = getFileExtension(
                request.file.originalname,
                request.file.mimetype
            );

            const safeOriginalName = sanitizeFileName(
                path.parse(request.file.originalname).name
            );

            const objectKey =
                `images/${Date.now()}-` +
                `${crypto.randomUUID()}-` +
                `${safeOriginalName}${extension}`;

            /*
 * Lấy thông tin ảnh được frontend gửi qua FormData.
 */
            const title =
                 request.body.title?.trim() ||
                 request.file.originalname;

            const category =
                 request.body.category?.trim() ||
                 "Đời sống";

            const description =
                request.body.description?.trim() ||
                 "";

            const author =
                  request.body.author?.trim() ||
                 "VistaShare";

            const owner =
                  request.body.owner?.trim() ||
                "";


            await s3Client.send(
                new PutObjectCommand({
                    Bucket: process.env.AWS_S3_BUCKET,
                    Key: objectKey,
                    Body: request.file.buffer,
                    ContentType: request.file.mimetype,

                 Metadata: {
                     originalname: encodeURIComponent(
                         request.file.originalname
                     ),

                     title: encodeURIComponent(title),

                    category: encodeURIComponent(category),

                    description: encodeURIComponent(
                        description
                    ),

                    author: encodeURIComponent(author),

                    owner: encodeURIComponent(owner)
                 }
            })
        );
            

            const signedUrl = await getSignedUrl(
                s3Client,

                new GetObjectCommand({
                    Bucket: process.env.AWS_S3_BUCKET,
                    Key: objectKey
                }),

                {
                    expiresIn: 60 * 60
                }
            );

            response.status(201).json({
                success: true,
                message: "Tải ảnh lên Amazon S3 thành công.",

                image: {
                    key: objectKey,
                    id: objectKey,
                    name: request.file.originalname,
                    
                    title,
                    category,
                    description,
                    author,
                    owner,
                    url: signedUrl,
                    src: signedUrl,
                    imageUrl: signedUrl,
                    size: request.file.size,
                    lastModified: new Date().toISOString()
                }
            });
        } catch (error) {
            next(error);
        }
    }
);

/*
 * 8. API xóa ảnh
 *
 * Gửi JSON:
 * {
 *   "key": "images/ten-file.jpg"
 * }
 */
app.delete("/api/images", async (request, response, next) => {
    try {
        const key = request.body.key;

        if (
            typeof key !== "string" ||
            !key.startsWith("images/")
        ) {
            return response.status(400).json({
                success: false,
                message: "Khóa ảnh không hợp lệ."
            });
        }

        await s3Client.send(
            new DeleteObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET,
                Key: key
            })
        );

        response.json({
            success: true,
            message: "Đã xóa ảnh khỏi Amazon S3."
        });
    } catch (error) {
        next(error);
    }
});

/*
 * 9. Trả giao diện chính cho đường dẫn chưa xác định
 */
app.use((request, response, next) => {
    if (request.path.startsWith("/api/")) {
        return response.status(404).json({
            success: false,
            message: "Không tìm thấy API."
        });
    }

    response.sendFile(
        path.join(__dirname, "public", "index.html")
    );
});

/*
 * 10. Xử lý lỗi
 */
app.use((error, request, response, next) => {
    console.error("Lỗi server:", error);

    if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
            return response.status(400).json({
                success: false,
                message: "Ảnh không được vượt quá 5 MB."
            });
        }

        return response.status(400).json({
            success: false,
            message: error.message
        });
    }

    if (
        error.message ===
        "Chỉ chấp nhận ảnh JPG, PNG, WEBP hoặc GIF."
    ) {
        return response.status(400).json({
            success: false,
            message: error.message
        });
    }

    const awsErrorName = error.name || "";

    if (
        awsErrorName === "AccessDenied" ||
        awsErrorName === "Forbidden"
    ) {
        return response.status(403).json({
            success: false,
            message:
                "AWS từ chối truy cập. Kiểm tra IAM policy, " +
                "tên bucket và Access Key."
        });
    }

    if (awsErrorName === "NoSuchBucket") {
        return response.status(500).json({
            success: false,
            message:
                "Không tìm thấy S3 Bucket. " +
                "Kiểm tra AWS_S3_BUCKET trong file .env."
        });
    }

    if (
        awsErrorName === "InvalidAccessKeyId" ||
        awsErrorName === "SignatureDoesNotMatch"
    ) {
        return response.status(500).json({
            success: false,
            message:
                "Access Key hoặc Secret Access Key không hợp lệ."
        });
    }

    response.status(500).json({
        success: false,
        message:
            error.message ||
            "Đã xảy ra lỗi trong server."
    });
});

/*
 * 11. Khởi động server
 */
app.listen(port, "0.0.0.0", () => {
    console.log("-----------------------------------------");
    console.log("VistaShare server đã khởi động");
    console.log(`Địa chỉ: http://localhost:${port}`);
    console.log(`Bucket: ${process.env.AWS_S3_BUCKET}`);
    console.log(`Region: ${process.env.AWS_REGION}`);
    console.log("-----------------------------------------");
});

function getFileExtension(originalName, mimeType) {
    const originalExtension =
        path.extname(originalName).toLowerCase();

    const acceptedExtensions = new Set([
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
        ".gif"
    ]);

    if (acceptedExtensions.has(originalExtension)) {
        return originalExtension;
    }

    const extensionByMimeType = {
        "image/jpeg": ".jpg",
        "image/png": ".png",
        "image/webp": ".webp",
        "image/gif": ".gif"
    };

    return extensionByMimeType[mimeType] || ".jpg";
}

function sanitizeFileName(fileName) {
    const sanitized = fileName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9-_]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase();

    return sanitized || "image";
}

function getDisplayName(objectKey) {
    const fileName = objectKey.split("/").pop();

    return fileName || objectKey;
}
function decodeMetadata(value, fallback = "") {
    if (!value) {
        return fallback;
    }

    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
}