import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
    const body = (await request.json()) as HandleUploadBody;
    console.log('Received upload request:', body);

    try {
        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async () => {
                return {
                    allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
                    // İleride kullanıcı yetkilendirmesi eklersen, payload'a context ekleyebilirsin
                    // tokenPayload: JSON.stringify({ userId: '123' }), 
                };
            },
            // ZORUNLU PARAMETRE: Vercel bu callback'i tanımlamanı şart koşar.
            onUploadCompleted: async ({ blob, tokenPayload }) => {
                // Dosya başarıyla yüklendiğinde Vercel burayı arka planda tetikler.
                console.log('Upload successfully completed for URL:', blob.url);
                // Not: DB kaydını front-end'de yaptığın için burayı sadece log için kullanıyoruz.
            }
        });

        return NextResponse.json(jsonResponse);
    } catch (error) {
        // Hatanın tam olarak ne olduğunu sunucu terminalinde (VSC Terminal / Vercel Logs) gör.
        console.error('VERCEL BLOB UPLOAD ERROR DETAYI:', error);

        return NextResponse.json(
            { error: (error as Error).message },
            { status: 400 } // Bad Request
        );
    }
}