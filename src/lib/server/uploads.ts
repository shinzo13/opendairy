import fs from 'fs/promises';
import path from 'path';

const UPLOADS_DIR = process.env.UPLOADS_DIR ?? path.join(process.cwd(), 'uploads');

export async function ensureUploadsDir() {
	await fs.mkdir(UPLOADS_DIR, { recursive: true });
}

export async function saveUpload(file: File): Promise<string> {
	await ensureUploadsDir();
	const ext = path.extname(file.name) || '.jpg';
	const filename = crypto.randomUUID() + ext;
	const buffer = Buffer.from(await file.arrayBuffer());
	await fs.writeFile(path.join(UPLOADS_DIR, filename), buffer);
	return filename;
}

export async function deleteUpload(filename: string) {
	try {
		await fs.unlink(path.join(UPLOADS_DIR, filename));
	} catch {
		// файл уже удалён — не страшно
	}
}

export async function readUpload(filename: string): Promise<Buffer | null> {
	try {
		return await fs.readFile(path.join(UPLOADS_DIR, filename));
	} catch {
		return null;
	}
}
