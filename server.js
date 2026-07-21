require("dotenv").config();

const path = require("path");
const crypto = require("crypto");
const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
    S3Client,
    PutObjectCommand,
    ListObjectsV2Command,
    GetObjectCommand,
    HeadObjectCommand,
    DeleteObjectCommand
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const app = express();
const port = process.env.PORT || 4000;

const requiredEnvironmentVariables = [
    "AWS_REGION",
    "AWS_S3_BUCKET",
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
    "MONGODB_URI",
    "JWT_SECRET"
];

for (const variableName of requiredEnvironmentVariables) {
    if (!process.env[variableName]) {
        console.error(`Thiếu biến môi trường: ${variableName}`);
        process.exit(1);
    }
}

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, maxlength: 60 },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        passwordHash: { type: String, required: true },
        displayName: { type: String, trim: true, maxlength: 60 },
        username: { type: String, trim: true, maxlength: 30 },
        bio: { type: String, default: "", maxlength: 220 },
        avatar: { type: String, default: "" },
        cover: { type: String, default: "" },
        avatarKey: { type: String, default: "" },
        coverKey: { type: String, default: "" },
        country: { type: String, default: "", maxlength: 80 },
        city: { type: String, default: "", maxlength: 80 },
        hometown: { type: String, default: "", maxlength: 100 },
        relationship: { type: String, default: "", maxlength: 60 },
        education: { type: String, default: "", maxlength: 120 },
        workplace: { type: String, default: "", maxlength: 120 },
        facebook: { type: String, default: "", maxlength: 300 },
        instagram: { type: String, default: "", maxlength: 300 },
        youtube: { type: String, default: "", maxlength: 300 },
        tiktok: { type: String, default: "", maxlength: 300 },
        website: { type: String, default: "", maxlength: 300 },
        role: { type: String, enum: ["user", "moderator", "admin"], default: "user" }
    },
    { timestamps: true }
);
const User = mongoose.model("User", userSchema);

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, minlength: 2, maxlength: 40 },
        normalizedName: { type: String, required: true, unique: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
        createdByRole: { type: String, enum: ["system", "user", "admin"], default: "user" },
        isSystem: { type: Boolean, default: false }
    },
    { timestamps: true }
);
const Category = mongoose.model("Category", categorySchema);

/*
 * Dữ liệu tương tác thật giữa các tài khoản.
 * Ảnh mẫu vẫn giữ lượt thích/bình luận ảo ở frontend.
 */
const likeSchema = new mongoose.Schema(
    {
        photoId: { type: String, required: true, index: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
    },
    { timestamps: true }
);
likeSchema.index({ photoId: 1, userId: 1 }, { unique: true });
const Like = mongoose.model("Like", likeSchema);

const commentSchema = new mongoose.Schema(
    {
        photoId: { type: String, required: true, index: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        text: { type: String, required: true, trim: true, maxlength: 500 }
    },
    { timestamps: true }
);
const Comment = mongoose.model("Comment", commentSchema);

const notificationSchema = new mongoose.Schema(
    {
        recipientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
        actorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
        type: { type: String, enum: ["like", "comment", "message", "system"], required: true },
        photoId: { type: String, default: "" },
        conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", default: null },
        text: { type: String, default: "", maxlength: 500 },
        read: { type: Boolean, default: false }
    },
    { timestamps: true }
);
const Notification = mongoose.model("Notification", notificationSchema);

const conversationSchema = new mongoose.Schema(
    {
        participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
        participantKey: { type: String, required: true, unique: true, index: true },
        lastMessage: { type: String, default: "" },
        lastMessageAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);
const Conversation = mongoose.model("Conversation", conversationSchema);

const messageSchema = new mongoose.Schema(
    {
        conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true, index: true },
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
        receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
        text: { type: String, required: true, trim: true, maxlength: 1000 },
        read: { type: Boolean, default: false },
        automatic: { type: Boolean, default: false }
    },
    { timestamps: true }
);
const Message = mongoose.model("Message", messageSchema);


const SYSTEM_CATEGORIES = [
    "Thiên nhiên", "Du lịch", "Game", "Động vật", "Kiến trúc", "Ẩm thực",
    "Công nghệ", "Nghệ thuật", "Đời sống", "Biển", "Hoa", "Thành phố",
    "Xe cộ", "Vũ trụ", "Thể thao", "Thời trang", "Trừu tượng"
];

async function createProfileImageUrl(objectKey, fallback = "") {
    if (!objectKey) return fallback || "";

    try {
        return await getSignedUrl(
            s3Client,
            new GetObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET,
                Key: objectKey
            }),
            { expiresIn: 60 * 60 * 24 }
        );
    } catch (error) {
        console.warn(`Không thể tạo liên kết ảnh hồ sơ ${objectKey}:`, error.message);
        return fallback || "";
    }
}

async function publicUser(user) {
    const avatar = await createProfileImageUrl(user.avatarKey, user.avatar);
    const cover = await createProfileImageUrl(user.coverKey, user.cover);

    return {
        id: user._id,
        name: user.name,
        displayName: user.displayName || user.name,
        username: user.username,
        email: user.email,
        role: user.role || "user",
        bio: user.bio,
        avatar,
        cover,
        country: user.country || "",
        city: user.city || "",
        hometown: user.hometown || "",
        relationship: user.relationship || "",
        education: user.education || "",
        workplace: user.workplace || "",
        facebook: user.facebook || "",
        instagram: user.instagram || "",
        youtube: user.youtube || "",
        tiktok: user.tiktok || "",
        website: user.website || "",
        createdAt: user.createdAt
    };
}

function createAccessToken(user) {
    return jwt.sign(
        { userId: user._id.toString(), email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
}

async function requireAuth(request, response, next) {
    try {
        const authorization = request.headers.authorization || "";
        if (!authorization.startsWith("Bearer ")) {
            return response.status(401).json({ success: false, message: "Bạn chưa đăng nhập." });
        }
        const payload = jwt.verify(authorization.slice(7), process.env.JWT_SECRET);
        const user = await User.findById(payload.userId).select("-passwordHash");
        if (!user) {
            return response.status(401).json({ success: false, message: "Tài khoản không tồn tại." });
        }
        request.user = user;
        next();
    } catch {
        return response.status(401).json({
            success: false,
            message: "Phiên đăng nhập không hợp lệ hoặc đã hết hạn."
        });
    }
}

function requireAdmin(request, response, next) {
    if (request.user.role !== "admin") {
        return response.status(403).json({
            success: false,
            message: "Chức năng này chỉ dành cho quản trị viên."
        });
    }
    next();
}

function requireModerator(request, response, next) {
    if (!["moderator", "admin"].includes(request.user.role)) {
        return response.status(403).json({ success: false, message: "Chức năng này chỉ dành cho kiểm duyệt viên hoặc quản trị viên." });
    }
    next();
}

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 8 * 1024 * 1024 },
    fileFilter: (request, file, callback) => {
        if (!allowedMimeTypes.has(file.mimetype)) {
            return callback(new Error("Chỉ chấp nhận ảnh JPG, PNG, WEBP hoặc GIF."));
        }
        callback(null, true);
    }
});

app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (request, response) => {
    response.json({
        success: true,
        message: "Server VistaShare đang hoạt động.",
        bucket: process.env.AWS_S3_BUCKET,
        region: process.env.AWS_REGION,
        mongodb: mongoose.connection.readyState === 1
    });
});

app.post("/api/auth/register", async (request, response, next) => {
    try {
        const name = String(request.body.name || "").trim();
        const email = String(request.body.email || "").trim().toLowerCase();
        const password = String(request.body.password || "");
        if (!name || !email || !password) {
            return response.status(400).json({ success: false, message: "Vui lòng nhập đầy đủ họ tên, email và mật khẩu." });
        }
        if (password.length < 6) {
            return response.status(400).json({ success: false, message: "Mật khẩu phải có ít nhất 6 ký tự." });
        }
        if (await User.findOne({ email })) {
            return response.status(409).json({ success: false, message: "Email này đã được đăng ký." });
        }
        const passwordHash = await bcrypt.hash(password, 12);
        const user = await User.create({
            name,
            displayName: name,
            username: email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "_"),
            email,
            passwordHash,
            role: "user"
        });
        response.status(201).json({ success: true, message: "Đăng ký thành công.", token: createAccessToken(user), user: await publicUser(user) });
    } catch (error) {
        if (error?.code === 11000) {
            return response.status(409).json({ success: false, message: "Email này đã được đăng ký." });
        }
        next(error);
    }
});

app.post("/api/auth/login", async (request, response, next) => {
    try {
        const email = String(request.body.email || "").trim().toLowerCase();
        const password = String(request.body.password || "");
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return response.status(401).json({ success: false, message: "Email hoặc mật khẩu không chính xác." });
        }
        response.json({ success: true, message: "Đăng nhập thành công.", token: createAccessToken(user), user: await publicUser(user) });
    } catch (error) {
        next(error);
    }
});

app.get("/api/auth/me", requireAuth, async (request, response, next) => {
    try {
        response.json({ success: true, user: await publicUser(request.user) });
    } catch (error) {
        next(error);
    }
});

/*
 * Hồ sơ công khai của tác giả bài đăng.
 * Dùng để hiển thị avatar trong chi tiết ảnh và khi xem hồ sơ từ máy khác.
 */
app.get("/api/users/profile", async (request, response, next) => {
    try {
        const email = String(request.query.email || "").trim().toLowerCase();

        if (!email) {
            return response.status(400).json({
                success: false,
                message: "Thiếu email người dùng."
            });
        }

        const user = await User.findOne({ email }).select("-passwordHash");

        if (!user) {
            return response.status(404).json({
                success: false,
                message: "Không tìm thấy hồ sơ người dùng."
            });
        }

        response.json({
            success: true,
            user: await publicUser(user)
        });
    } catch (error) {
        next(error);
    }
});

/*
 * Cập nhật thông tin hồ sơ trong MongoDB.
 */
app.patch("/api/profile", requireAuth, async (request, response, next) => {
    try {
        const displayName = String(request.body.displayName || "").trim();
        const username = String(request.body.username || "").trim().replace(/\s+/g, "_");
        const bio = String(request.body.bio || "").trim();

        if (!displayName || !username) {
            return response.status(400).json({
                success: false,
                message: "Tên hiển thị và tên người dùng không được để trống."
            });
        }

        request.user.name = displayName;
        request.user.displayName = displayName;
        request.user.username = username;
        request.user.bio = bio;
        request.user.country = String(request.body.country || "").trim();
        request.user.city = String(request.body.city || "").trim();
        request.user.hometown = String(request.body.hometown || "").trim();
        request.user.relationship = String(request.body.relationship || "").trim();
        request.user.education = String(request.body.education || "").trim();
        request.user.workplace = String(request.body.workplace || "").trim();
        request.user.facebook = String(request.body.facebook || "").trim();
        request.user.instagram = String(request.body.instagram || "").trim();
        request.user.youtube = String(request.body.youtube || "").trim();
        request.user.tiktok = String(request.body.tiktok || "").trim();
        request.user.website = String(request.body.website || "").trim();

        await request.user.save();

        response.json({
            success: true,
            message: "Đã cập nhật hồ sơ.",
            user: await publicUser(request.user)
        });
    } catch (error) {
        next(error);
    }
});

/*
 * Upload avatar hoặc ảnh bìa lên S3 và lưu S3 key vào MongoDB.
 * Signed URL chỉ được tạo khi trả dữ liệu về trình duyệt nên việc đăng nhập
 * lại hoặc tải lại trang luôn nhận được đường dẫn mới còn hiệu lực.
 */
app.post(
    "/api/profile/image",
    requireAuth,
    upload.single("image"),
    async (request, response, next) => {
        try {
            if (!request.file) {
                return response.status(400).json({ success: false, message: "Không tìm thấy ảnh." });
            }

            const type = String(request.body.type || "");
            if (!['avatar', 'cover'].includes(type)) {
                return response.status(400).json({ success: false, message: "Loại ảnh hồ sơ không hợp lệ." });
            }

            const extension = getFileExtension(request.file.originalname, request.file.mimetype);
            const objectKey = `profiles/${request.user._id}/${type}-${Date.now()}-${crypto.randomUUID()}${extension}`;
            const keyField = type === "avatar" ? "avatarKey" : "coverKey";
            const oldKey = request.user[keyField];

            await s3Client.send(new PutObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET,
                Key: objectKey,
                Body: request.file.buffer,
                ContentType: request.file.mimetype
            }));

            request.user[keyField] = objectKey;
            request.user[type] = "";
            await request.user.save();

            if (oldKey && oldKey !== objectKey) {
                try {
                    await s3Client.send(new DeleteObjectCommand({
                        Bucket: process.env.AWS_S3_BUCKET,
                        Key: oldKey
                    }));
                } catch (deleteError) {
                    console.warn("Không thể xóa ảnh hồ sơ cũ:", deleteError.message);
                }
            }

            response.json({
                success: true,
                message: type === "avatar" ? "Đã cập nhật ảnh đại diện." : "Đã cập nhật ảnh bìa.",
                user: await publicUser(request.user)
            });
        } catch (error) {
            next(error);
        }
    }
);

app.get("/api/categories", async (request, response, next) => {
    try {
        const categories = await Category.find().sort({ isSystem: -1, name: 1 }).lean();
        response.json({ success: true, categories });
    } catch (error) {
        next(error);
    }
});

app.post("/api/categories", requireAuth, async (request, response, next) => {
    try {
        const name = String(request.body.name || "").trim();
        if (name.length < 2 || name.length > 40) {
            return response.status(400).json({ success: false, message: "Tên danh mục phải từ 2 đến 40 ký tự." });
        }
        const normalizedName = normalizeCategoryName(name);
        if (await Category.findOne({ normalizedName })) {
            return response.status(409).json({ success: false, message: "Danh mục này đã tồn tại." });
        }
        const category = await Category.create({
            name,
            normalizedName,
            createdBy: request.user._id,
            createdByRole: request.user.role,
            isSystem: false
        });
        response.status(201).json({ success: true, message: "Đã thêm danh mục thành công.", category });
    } catch (error) {
        next(error);
    }
});

app.delete("/api/categories/:id", requireAuth, async (request, response, next) => {
    try {
        const category = await Category.findById(request.params.id);
        if (!category) {
            return response.status(404).json({ success: false, message: "Không tìm thấy danh mục." });
        }
        const isAdmin = ["admin", "moderator"].includes(request.user.role);
        const isOwner = category.createdBy && category.createdBy.toString() === request.user._id.toString();
        if (!isAdmin && (!isOwner || category.isSystem)) {
            return response.status(403).json({ success: false, message: "Bạn chỉ được xóa danh mục do mình tạo." });
        }
        await category.deleteOne();
        response.json({ success: true, message: "Đã xóa danh mục." });
    } catch (error) {
        next(error);
    }
});

async function buildImageObject(object) {
    const headResult = await s3Client.send(new HeadObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: object.Key
    }));
    const metadata = headResult.Metadata || {};
    const signedUrl = await getSignedUrl(
        s3Client,
        new GetObjectCommand({ Bucket: process.env.AWS_S3_BUCKET, Key: object.Key }),
        { expiresIn: 60 * 60 }
    );
    return {
        key: object.Key,
        id: object.Key,
        name: decodeMetadata(metadata.originalname, getDisplayName(object.Key)),
        title: decodeMetadata(metadata.title, getDisplayName(object.Key)),
        category: decodeMetadata(metadata.category, "Đời sống"),
        description: decodeMetadata(metadata.description, "Ảnh được lưu trữ trên Amazon S3."),
        author: decodeMetadata(metadata.author, "VistaShare"),
        owner: decodeMetadata(metadata.owner, ""),
        url: signedUrl,
        src: signedUrl,
        imageUrl: signedUrl,
        size: object.Size || headResult.ContentLength || 0,
        lastModified: object.LastModified || headResult.LastModified
    };
}

async function listS3Images() {
    const listResult = await s3Client.send(new ListObjectsV2Command({
        Bucket: process.env.AWS_S3_BUCKET,
        Prefix: "images/"
    }));
    const objects = (listResult.Contents || [])
        .filter((object) => object.Key !== "images/")
        .sort((a, b) => new Date(b.LastModified) - new Date(a.LastModified));
    return Promise.all(objects.map(buildImageObject));
}

app.get("/api/images", async (request, response, next) => {
    try {
        const images = await listS3Images();
        response.json({ success: true, count: images.length, images });
    } catch (error) {
        next(error);
    }
});

app.post("/api/images", requireAuth, upload.single("image"), async (request, response, next) => {
    try {
        if (!request.file) {
            return response.status(400).json({ success: false, message: "Không tìm thấy file ảnh." });
        }
        const extension = getFileExtension(request.file.originalname, request.file.mimetype);
        const safeOriginalName = sanitizeFileName(path.parse(request.file.originalname).name);
        const objectKey = `images/${Date.now()}-${crypto.randomUUID()}-${safeOriginalName}${extension}`;
        const title = request.body.title?.trim() || request.file.originalname;
        const category = request.body.category?.trim() || "Đời sống";
        const description = request.body.description?.trim() || "";
        const author = request.user.displayName || request.user.name || "VistaShare";
        const owner = request.user.email;

        await s3Client.send(new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: objectKey,
            Body: request.file.buffer,
            ContentType: request.file.mimetype,
            Metadata: {
                originalname: encodeURIComponent(request.file.originalname),
                title: encodeURIComponent(title),
                category: encodeURIComponent(category),
                description: encodeURIComponent(description),
                author: encodeURIComponent(author),
                owner: encodeURIComponent(owner)
            }
        }));

        const signedUrl = await getSignedUrl(
            s3Client,
            new GetObjectCommand({ Bucket: process.env.AWS_S3_BUCKET, Key: objectKey }),
            { expiresIn: 60 * 60 }
        );
        response.status(201).json({
            success: true,
            message: "Tải ảnh lên Amazon S3 thành công.",
            image: {
                key: objectKey, id: objectKey, name: request.file.originalname,
                title, category, description, author, owner,
                url: signedUrl, src: signedUrl, imageUrl: signedUrl,
                size: request.file.size, lastModified: new Date().toISOString()
            }
        });
    } catch (error) {
        next(error);
    }
});

app.delete("/api/images", requireAuth, async (request, response, next) => {
    try {
        const key = request.body.key;
        if (typeof key !== "string" || !key.startsWith("images/")) {
            return response.status(400).json({ success: false, message: "Khóa ảnh không hợp lệ." });
        }
        const headResult = await s3Client.send(new HeadObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: key
        }));
        const ownerEmail = decodeMetadata(headResult.Metadata?.owner, "");
        const isOwner = ownerEmail && ownerEmail === request.user.email;
        const isAdmin = ["admin", "moderator"].includes(request.user.role);
        if (!isOwner && !isAdmin) {
            return response.status(403).json({ success: false, message: "Bạn không có quyền xóa bài đăng này." });
        }
        await s3Client.send(new DeleteObjectCommand({ Bucket: process.env.AWS_S3_BUCKET, Key: key }));
        await Promise.all([
            Like.deleteMany({ photoId: key }),
            Comment.deleteMany({ photoId: key }),
            Notification.deleteMany({ photoId: key })
        ]);
        response.json({ success: true, message: "Đã xóa ảnh khỏi Amazon S3." });
    } catch (error) {
        next(error);
    }
});

app.get("/api/admin/users", requireAuth, requireAdmin, async (request, response, next) => {
    try {
        const users = await User.find().select("-passwordHash").sort({ createdAt: -1 }).lean();
        response.json({ success: true, users });
    } catch (error) {
        next(error);
    }
});

app.patch("/api/admin/users/:userId/role", requireAuth, requireAdmin, async (request, response, next) => {
    try {
        const allowedRoles = new Set(["user", "moderator", "admin"]);
        const role = String(request.body.role || "").trim();
        if (!allowedRoles.has(role)) return response.status(400).json({ success: false, message: "Vai trò không hợp lệ." });
        if (String(request.params.userId) === String(request.user._id)) return response.status(400).json({ success: false, message: "Không thể tự thay đổi vai trò của tài khoản đang đăng nhập." });
        const user = await User.findById(request.params.userId);
        if (!user) return response.status(404).json({ success: false, message: "Không tìm thấy tài khoản." });
        user.role = role;
        await user.save();
        response.json({ success: true, message: `Đã cập nhật vai trò thành ${role === "admin" ? "Quản trị viên" : role === "moderator" ? "Kiểm duyệt viên (MOD)" : "Thành viên"}.`, user: await publicUser(user) });
    } catch (error) { next(error); }
});

app.delete("/api/admin/users/:userId", requireAuth, requireAdmin, async (request, response, next) => {
    try {
        if (String(request.params.userId) === String(request.user._id)) return response.status(400).json({ success: false, message: "Không thể tự xóa tài khoản đang đăng nhập." });
        const user = await User.findById(request.params.userId);
        if (!user) return response.status(404).json({ success: false, message: "Không tìm thấy tài khoản." });
        await Promise.all([
            Like.deleteMany({ userId: user._id }),
            Comment.deleteMany({ userId: user._id }),
            Notification.deleteMany({ $or: [{ recipientId: user._id }, { actorId: user._id }] }),
            Message.deleteMany({ $or: [{ senderId: user._id }, { receiverId: user._id }] }),
            Conversation.deleteMany({ participants: user._id }),
            Category.deleteMany({ createdBy: user._id, isSystem: false })
        ]);
        await user.deleteOne();
        response.json({ success: true, message: "Đã xóa tài khoản và dữ liệu tương tác liên quan." });
    } catch (error) { next(error); }
});

app.get("/api/admin/images", requireAuth, requireModerator, async (request, response, next) => {
    try {
        const images = await listS3Images();
        response.json({ success: true, images });
    } catch (error) {
        next(error);
    }
});


/*
 * API tương tác thật cho ảnh do người dùng tải lên.
 */
function isCloudPhotoId(photoId) {
    return typeof photoId === "string" && photoId.startsWith("images/");
}

async function getPhotoOwnerUser(photoId) {
    if (!isCloudPhotoId(photoId)) return null;

    const headResult = await s3Client.send(new HeadObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: photoId
    }));

    const ownerEmail = decodeMetadata(headResult.Metadata?.owner, "").trim().toLowerCase();
    if (!ownerEmail) return null;
    return User.findOne({ email: ownerEmail });
}

async function createUserNotification({ recipientId, actorId = null, type, text, photoId = "", conversationId = null }) {
    if (!recipientId) return null;
    if (actorId && recipientId.toString() === actorId.toString()) return null;

    return Notification.create({
        recipientId,
        actorId,
        type,
        text,
        photoId,
        conversationId,
        read: false
    });
}

app.get("/api/photos/social", async (request, response, next) => {
    try {
        const photoId = String(request.query.photoId || "");
        if (!isCloudPhotoId(photoId)) {
            return response.status(400).json({ success: false, message: "Chỉ hỗ trợ bài đăng thật trên S3." });
        }

        let currentUserId = null;
        const authorization = request.headers.authorization || "";
        if (authorization.startsWith("Bearer ")) {
            try {
                const payload = jwt.verify(authorization.slice(7), process.env.JWT_SECRET);
                currentUserId = payload.userId;
            } catch {}
        }

        const [likeCount, comments, liked] = await Promise.all([
            Like.countDocuments({ photoId }),
            Comment.find({ photoId })
                .sort({ createdAt: -1 })
                .limit(100)
                .populate("userId", "name displayName email avatar avatarKey")
                .lean(),
            currentUserId ? Like.exists({ photoId, userId: currentUserId }) : null
        ]);

        const serializedComments = await Promise.all(comments.map(async (comment) => {
            const author = comment.userId || {};
            return {
                id: comment._id,
                text: comment.text,
                createdAt: comment.createdAt,
                author: author.displayName || author.name || "Người dùng",
                authorEmail: author.email || "",
                avatar: await createProfileImageUrl(author.avatarKey, author.avatar)
            };
        }));

        response.json({
            success: true,
            likes: likeCount,
            liked: Boolean(liked),
            comments: serializedComments
        });
    } catch (error) {
        next(error);
    }
});

app.post("/api/photos/like", requireAuth, async (request, response, next) => {
    try {
        const photoId = String(request.body.photoId || "");
        if (!isCloudPhotoId(photoId)) {
            return response.status(400).json({ success: false, message: "Chỉ có thể thích bài đăng thật." });
        }

        let created = false;
        try {
            await Like.create({ photoId, userId: request.user._id });
            created = true;
        } catch (error) {
            if (error?.code !== 11000) throw error;
        }

        if (created) {
            const owner = await getPhotoOwnerUser(photoId);
            await createUserNotification({
                recipientId: owner?._id,
                actorId: request.user._id,
                type: "like",
                photoId,
                text: "đã thích ảnh của bạn."
            });
        }

        response.json({
            success: true,
            liked: true,
            likes: await Like.countDocuments({ photoId })
        });
    } catch (error) {
        next(error);
    }
});

app.delete("/api/photos/like", requireAuth, async (request, response, next) => {
    try {
        const photoId = String(request.body.photoId || "");
        if (!isCloudPhotoId(photoId)) {
            return response.status(400).json({ success: false, message: "Chỉ có thể bỏ thích bài đăng thật." });
        }

        await Like.deleteOne({ photoId, userId: request.user._id });
        response.json({
            success: true,
            liked: false,
            likes: await Like.countDocuments({ photoId })
        });
    } catch (error) {
        next(error);
    }
});

app.post("/api/photos/comments", requireAuth, async (request, response, next) => {
    try {
        const photoId = String(request.body.photoId || "");
        const text = String(request.body.text || "").trim();

        if (!isCloudPhotoId(photoId)) {
            return response.status(400).json({ success: false, message: "Chỉ có thể bình luận bài đăng thật." });
        }
        if (!text || text.length > 500) {
            return response.status(400).json({ success: false, message: "Bình luận phải từ 1 đến 500 ký tự." });
        }

        const comment = await Comment.create({
            photoId,
            userId: request.user._id,
            text
        });

        const owner = await getPhotoOwnerUser(photoId);
        await createUserNotification({
            recipientId: owner?._id,
            actorId: request.user._id,
            type: "comment",
            photoId,
            text: "đã bình luận ảnh của bạn."
        });

        response.status(201).json({
            success: true,
            comment: {
                id: comment._id,
                text: comment.text,
                createdAt: comment.createdAt,
                author: request.user.displayName || request.user.name,
                authorEmail: request.user.email,
                avatar: await createProfileImageUrl(request.user.avatarKey, request.user.avatar)
            }
        });
    } catch (error) {
        next(error);
    }
});

/*
 * API thông báo thật.
 */
app.get("/api/notifications", requireAuth, async (request, response, next) => {
    try {
        const notifications = await Notification.find({ recipientId: request.user._id })
            .sort({ createdAt: -1 })
            .limit(80)
            .populate("actorId", "name displayName email avatar avatarKey")
            .lean();

        const items = await Promise.all(notifications.map(async (item) => {
            const actor = item.actorId || {};
            return {
                id: item._id,
                type: item.type,
                text: item.text,
                photoId: item.photoId,
                conversationId: item.conversationId,
                read: item.read,
                createdAt: item.createdAt,
                actor: actor.displayName || actor.name || "VistaShare",
                actorEmail: actor.email || "",
                actorAvatar: await createProfileImageUrl(actor.avatarKey, actor.avatar)
            };
        }));

        response.json({
            success: true,
            notifications: items,
            unread: items.filter((item) => !item.read).length
        });
    } catch (error) {
        next(error);
    }
});

app.patch("/api/notifications/read-all", requireAuth, async (request, response, next) => {
    try {
        await Notification.updateMany(
            { recipientId: request.user._id, read: false },
            { $set: { read: true } }
        );
        response.json({ success: true });
    } catch (error) {
        next(error);
    }
});

app.patch("/api/notifications/:id/read", requireAuth, async (request, response, next) => {
    try {
        await Notification.updateOne(
            { _id: request.params.id, recipientId: request.user._id },
            { $set: { read: true } }
        );
        response.json({ success: true });
    } catch (error) {
        next(error);
    }
});

/*
 * API chat hai chiều thật. Khi tạo cuộc trò chuyện mới, hệ thống vẫn
 * thêm một tin nhắn chào tự động như phiên bản cũ.
 */
function makeParticipantKey(firstId, secondId) {
    return [firstId.toString(), secondId.toString()].sort().join(":");
}

async function serializeConversation(conversation, currentUserId) {
    const participants = conversation.participants || [];
    const partner = participants.find((user) => user._id.toString() !== currentUserId.toString());
    const unread = await Message.countDocuments({
        conversationId: conversation._id,
        receiverId: currentUserId,
        read: false
    });

    return {
        id: conversation._id,
        partner: partner ? await publicUser(partner) : null,
        lastMessage: conversation.lastMessage || "",
        lastMessageAt: conversation.lastMessageAt,
        unread
    };
}

app.post("/api/conversations", requireAuth, async (request, response, next) => {
    try {
        const recipientEmail = String(request.body.recipientEmail || "").trim().toLowerCase();
        const recipient = await User.findOne({ email: recipientEmail }).select("-passwordHash");

        if (!recipient) {
            return response.status(404).json({ success: false, message: "Không tìm thấy tài khoản nhận tin nhắn." });
        }
        if (recipient._id.toString() === request.user._id.toString()) {
            return response.status(400).json({ success: false, message: "Bạn không thể tự nhắn tin cho chính mình." });
        }

        const participantKey = makeParticipantKey(request.user._id, recipient._id);
        let conversation = await Conversation.findOne({ participantKey }).populate("participants", "-passwordHash");

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [request.user._id, recipient._id],
                participantKey,
                lastMessage: "Xin chào, rất vui được kết nối với bạn trên VistaShare.",
                lastMessageAt: new Date()
            });

            await Message.create({
                conversationId: conversation._id,
                senderId: null,
                receiverId: null,
                text: "Xin chào, rất vui được kết nối với bạn trên VistaShare.",
                read: true,
                automatic: true
            });

            conversation = await Conversation.findById(conversation._id).populate("participants", "-passwordHash");
        }

        response.json({
            success: true,
            conversation: await serializeConversation(conversation, request.user._id)
        });
    } catch (error) {
        next(error);
    }
});

app.get("/api/conversations", requireAuth, async (request, response, next) => {
    try {
        const conversations = await Conversation.find({ participants: request.user._id })
            .sort({ lastMessageAt: -1 })
            .populate("participants", "-passwordHash");

        response.json({
            success: true,
            conversations: await Promise.all(
                conversations.map((conversation) => serializeConversation(conversation, request.user._id))
            )
        });
    } catch (error) {
        next(error);
    }
});

app.get("/api/conversations/:id/messages", requireAuth, async (request, response, next) => {
    try {
        const conversation = await Conversation.findOne({
            _id: request.params.id,
            participants: request.user._id
        });

        if (!conversation) {
            return response.status(404).json({ success: false, message: "Không tìm thấy cuộc trò chuyện." });
        }

        await Message.updateMany(
            { conversationId: conversation._id, receiverId: request.user._id, read: false },
            { $set: { read: true } }
        );

        const messages = await Message.find({ conversationId: conversation._id })
            .sort({ createdAt: 1 })
            .limit(300)
            .lean();

        response.json({
            success: true,
            messages: messages.map((message) => ({
                id: message._id,
                text: message.text,
                createdAt: message.createdAt,
                automatic: message.automatic,
                from: message.automatic
                    ? "system"
                    : message.senderId?.toString() === request.user._id.toString()
                        ? "me"
                        : "them"
            }))
        });
    } catch (error) {
        next(error);
    }
});

app.post("/api/conversations/:id/messages", requireAuth, async (request, response, next) => {
    try {
        const text = String(request.body.text || "").trim();
        if (!text || text.length > 1000) {
            return response.status(400).json({ success: false, message: "Tin nhắn phải từ 1 đến 1000 ký tự." });
        }

        const conversation = await Conversation.findOne({
            _id: request.params.id,
            participants: request.user._id
        });

        if (!conversation) {
            return response.status(404).json({ success: false, message: "Không tìm thấy cuộc trò chuyện." });
        }

        const receiverId = conversation.participants.find(
            (id) => id.toString() !== request.user._id.toString()
        );

        const message = await Message.create({
            conversationId: conversation._id,
            senderId: request.user._id,
            receiverId,
            text,
            read: false,
            automatic: false
        });

        conversation.lastMessage = text;
        conversation.lastMessageAt = message.createdAt;
        await conversation.save();

        await createUserNotification({
            recipientId: receiverId,
            actorId: request.user._id,
            type: "message",
            conversationId: conversation._id,
            text: "đã gửi cho bạn một tin nhắn."
        });

        response.status(201).json({
            success: true,
            message: {
                id: message._id,
                text: message.text,
                createdAt: message.createdAt,
                from: "me",
                automatic: false
            }
        });
    } catch (error) {
        next(error);
    }
});

app.get("/api/messages/unread-count", requireAuth, async (request, response, next) => {
    try {
        const count = await Message.countDocuments({
            receiverId: request.user._id,
            read: false
        });
        response.json({ success: true, count });
    } catch (error) {
        next(error);
    }
});

app.use((request, response) => {
    if (request.path.startsWith("/api/")) {
        return response.status(404).json({ success: false, message: "Không tìm thấy API." });
    }
    response.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use((error, request, response, next) => {
    console.error("Lỗi server:", error);
    if (error instanceof multer.MulterError) {
        return response.status(400).json({
            success: false,
            message: error.code === "LIMIT_FILE_SIZE" ? "Ảnh không được vượt quá 8 MB." : error.message
        });
    }
    if (error.message === "Chỉ chấp nhận ảnh JPG, PNG, WEBP hoặc GIF.") {
        return response.status(400).json({ success: false, message: error.message });
    }
    if (["AccessDenied", "Forbidden"].includes(error.name)) {
        return response.status(403).json({ success: false, message: "AWS từ chối truy cập. Kiểm tra IAM policy và cấu hình S3." });
    }
    if (error.name === "NoSuchBucket") {
        return response.status(500).json({ success: false, message: "Không tìm thấy S3 Bucket." });
    }
    response.status(500).json({ success: false, message: error.message || "Đã xảy ra lỗi trong server." });
});

async function seedCategories() {
    for (const name of SYSTEM_CATEGORIES) {
        const normalizedName = normalizeCategoryName(name);
        await Category.updateOne(
            { normalizedName },
            { $setOnInsert: { name, normalizedName, isSystem: true, createdByRole: "system", createdBy: null } },
            { upsert: true }
        );
    }
}

async function promoteConfiguredAdmin() {
    const adminEmail = String(process.env.ADMIN_EMAIL || "").trim().toLowerCase();
    if (!adminEmail) return;
    const result = await User.updateOne({ email: adminEmail }, { $set: { role: "admin" } });
    if (result.matchedCount) console.log(`Đã xác nhận tài khoản admin: ${adminEmail}`);
    else console.log(`ADMIN_EMAIL chưa có tài khoản tương ứng: ${adminEmail}`);
}

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await seedCategories();
        await promoteConfiguredAdmin();
        app.listen(port, "0.0.0.0", () => {
            console.log("-----------------------------------------");
            console.log("VistaShare server đã khởi động");
            console.log(`Địa chỉ: http://localhost:${port}`);
            console.log(`Bucket: ${process.env.AWS_S3_BUCKET}`);
            console.log(`Region: ${process.env.AWS_REGION}`);
            console.log("MongoDB: đã kết nối");
            console.log("-----------------------------------------");
        });
    } catch (error) {
        console.error("Không thể khởi động server:", error.message);
        process.exit(1);
    }
}

startServer();

function normalizeCategoryName(value) {
    return String(value || "").trim().toLocaleLowerCase("vi").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function getFileExtension(originalName, mimeType) {
    const originalExtension = path.extname(originalName).toLowerCase();
    const accepted = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
    if (accepted.has(originalExtension)) return originalExtension;
    return ({ "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/gif": ".gif" })[mimeType] || ".jpg";
}
function sanitizeFileName(fileName) {
    return fileName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9-_]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").toLowerCase() || "image";
}
function getDisplayName(objectKey) {
    return objectKey.split("/").pop() || objectKey;
}
function decodeMetadata(value, fallback = "") {
    if (!value) return fallback;
    try { return decodeURIComponent(value); } catch { return value; }
}
