import { QueryOptions, ResourceType } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || '';
const API_KEY = process.env.NEXT_PUBLIC_STORY_PROTOCOL_X_API_KEY || process.env.STORY_PROTOCOL_X_API_KEY || '';

export async function getResource(resourceName: ResourceType, resourceId: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/${process.env.NEXT_PUBLIC_CHAIN}/v1/${resourceName}/${resourceId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY as string,
      },
    });
    if (res.ok) {
      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
}

export async function listResource(resourceName: ResourceType, options: QueryOptions) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/${process.env.NEXT_PUBLIC_CHAIN}/v1/${resourceName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY as string,
      },
      cache: 'no-cache',
      body: JSON.stringify({ options }),
    });
    if (res.ok) {
      return res.json();
    } else {
      return res;
    }
  } catch (error) {
    console.error(error);
  }
}
