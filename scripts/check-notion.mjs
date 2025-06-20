import { Client } from '@notionhq/client';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function main() {
  const apiKey = process.env.NOTION_API_KEY;
  if (!apiKey) {
    console.error('ERROR: NOTION_API_KEY is not set in your .env.local file.');
    return;
  }
  console.log('✅ API Key loaded successfully.');
  console.log('Searching for databases and pages shared with this integration...');
  console.log('------------------------------------------------------------------');

  try {
    const response = await notion.search({});
    
    if (response.results.length === 0) {
      console.log('❌ No pages or databases found.');
      console.log('This means your integration has not been shared with ANY pages or databases yet.');
      console.log('Please go to your Notion pages/databases, click the "..." menu, and use "+ Add connections" to share them with your integration.');
      return;
    }

    console.log('✅ Found the following shared pages/databases:');
    response.results.forEach((item) => {
      if (item.object === 'database') {
        // @ts-ignore
        console.log(`[DATABASE] Title: ${item.title[0]?.plain_text}, ID: ${item.id}`);
      } else if (item.object === 'page') {
        // @ts-ignore
        const title = item.properties.title?.title[0]?.plain_text || 'Untitled';
        console.log(`  [PAGE]     Title: ${title}, ID: ${item.id}`);
      }
    });

    console.log('------------------------------------------------------------------');
    console.log('ACTION: Please compare the IDs printed above with the IDs in your .env.local file.');
    console.log('If a database is missing, you need to share it with your integration in Notion.');
    console.log('If the ID is different, you need to update it in your .env.local file.');

  } catch (error) {
    console.error('❌ An error occurred while trying to connect to Notion API:');
    console.error(error);
  }
}

main(); 