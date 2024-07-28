'use server';

import { revalidatePath } from 'next/cache';

export async function revalidate(path: string, type: 'page' | 'layout') {
  revalidatePath(path, type);
}
