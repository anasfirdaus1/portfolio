import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const CLOUD_NAME = 'dfxchgxvd';
const API_KEY = '969517127926769';
const API_SECRET = 'AmZRfRWa5eI6E5f6XbZoLp3Bf3Y';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Generate signature for signed upload
        const timestamp = Math.floor(Date.now() / 1000);
        const folder = 'portfolio';
        const paramsToSign = `folder=${folder}&timestamp=${timestamp}${API_SECRET}`;
        const signature = crypto.createHash('sha1').update(paramsToSign).digest('hex');

        // Build form data for Cloudinary
        const cloudinaryForm = new FormData();
        cloudinaryForm.append('file', file);
        cloudinaryForm.append('api_key', API_KEY);
        cloudinaryForm.append('timestamp', String(timestamp));
        cloudinaryForm.append('signature', signature);
        cloudinaryForm.append('folder', folder);

        // Upload to Cloudinary
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: cloudinaryForm,
        });

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json({ error: data.error?.message || 'Upload failed' }, { status: 500 });
        }

        return NextResponse.json({
            url: data.secure_url,
            public_id: data.public_id,
            width: data.width,
            height: data.height,
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
