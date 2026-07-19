// src/acitons.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { saveEngagementReferences } from './acitons';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

// Mock the external dependencies
vi.mock('@vercel/postgres', () => ({
  sql: vi.fn(),
}));

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

describe('saveEngagementReferences', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return error if photos array is empty', async () => {
    const result = await saveEngagementReferences([]);
    
    expect(result.status).toBe('error');
    expect(result.message).toBe('Veritabanı kayıt işlemi sırasında bir hata oluştu.'); // because error thrown in the function results in catch block
  });

  it('should successfully save photos and revalidate path', async () => {
    // Setup mock to resolve successfully
    (sql as any).mockResolvedValueOnce({});
    
    const photos = [
      { url: 'http://example.com/photo.jpg', alt: 'Test Photo', width: 800, height: 600 }
    ];

    const result = await saveEngagementReferences(photos);

    expect(sql).toHaveBeenCalled();
    expect(revalidatePath).toHaveBeenCalledWith('/');
    expect(result.status).toBe('success');
    expect(result.message).toBe('1 fotoğraf başarıyla yüklendi ve kaydedildi.');
  });
  
  it('should handle database errors gracefully', async () => {
    (sql as any).mockRejectedValueOnce(new Error('DB Error'));
    
    const photos = [
        { url: 'http://example.com/photo2.jpg', alt: 'Test Photo 2', width: 800, height: 600 }
    ];

    const result = await saveEngagementReferences(photos);
    
    expect(result.status).toBe('error');
    expect(result.message).toBe('Veritabanı kayıt işlemi sırasında bir hata oluştu.');
  });
});
