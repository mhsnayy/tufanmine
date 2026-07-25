import { sql } from '@vercel/postgres';
import { Hero } from "@/components/hero";
import { Gallery } from "@/components/gallery";
import { UploadModal } from "@/components/upload-modal";

interface GalleryPhoto {
    id: number;
    src: string;
    alt: string;
    width: number;
    height: number;
}

export const dynamic = 'force-dynamic';

export default async function WeddingPage() {
    const { rows } = await sql`
    SELECT * FROM wedding
    ORDER BY id DESC`;

    const mappedPhotos: GalleryPhoto[] = rows.map((row) => ({
        id: row.id,
        src: row.url,
        alt: row.alt || 'Galeri Görseli',
        width: row.width ?? 800,
        height: row.height ?? 600,
    }));

    return (
        <main className="min-h-screen bg-neutral-950">
            <div className="max-w-7xl mx-auto pb-10">
                <div className="flex justify-end p-6 sticky top-0 z-40 bg-linear-to-b from-neutral-950 to-transparent pointer-events-none">
                    <div className="pointer-events-auto">
                        {/* Uyarı: UploadModal'ın içindeki veritabanı yazma işleminin wedding tablosunu hedeflediğinden emin ol */}
                        <UploadModal />
                    </div>
                </div>

                <div className="space-y-8 px-4">
                    <Hero h1="Tufan & Mine" p="Düğün Albümü" />
                    <Gallery photos={mappedPhotos} />
                </div>
            </div>
        </main>
    );
}