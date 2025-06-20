import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { PageObjectResponse, QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

// Helper function to safely extract property values
const getProperty = <T>(property: any): T | undefined => {
  if (property) {
    if (property.title) return property.title[0]?.plain_text as T;
    if (property.rich_text) return property.rich_text[0]?.plain_text as T;
    if (property.multi_select) return property.multi_select.map((item: { name: string }) => item.name) as T;
    if (property.url) return property.url as T;
    if (property.select) return property.select?.name as T;
    if (property.date) return property.date?.start as T;
  }
  return undefined;
};

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export const getProjects = async () => {
  const databaseId = process.env.NOTION_PROJECTS_DB_ID;

  if (!databaseId) {
    throw new Error('NOTION_PROJECTS_DB_ID is not defined');
  }

  try {
    const response: QueryDatabaseResponse = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Name', // You might want to sort by a date property later
          direction: 'ascending',
        },
      ],
    });

    return response.results.map((page) => {
      const { properties } = page as PageObjectResponse;
      return {
        id: page.id,
        name: getProperty<string>(properties.Name),
        description: getProperty<string>(properties.Description),
        techStack: getProperty<string[]>(properties.TechStack) || [],
        role: getProperty<string>(properties.Role),
        url: getProperty<string>(properties.URL),
        category: getProperty<string>(properties.Category),
      };
    });
  } catch (error: any) {
    console.error('Error fetching projects from Notion:', error);
    throw new Error(`Failed to fetch projects from Notion. Original error: ${error.message}`);
  }
};

export const getBlogPosts = async () => {
  const databaseId = process.env.NOTION_BLOG_DB_ID;

  if (!databaseId) {
    throw new Error('NOTION_BLOG_DB_ID is not defined');
  }

  try {
    const response: QueryDatabaseResponse = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'PublishedDate',
          direction: 'descending',
        },
      ],
    });

    return response.results.map((page) => {
      const { properties } = page as PageObjectResponse;
      return {
        id: page.id,
        title: getProperty<string>(properties.Title),
        summary: getProperty<string>(properties.Summary),
        category: getProperty<string>(properties.Category),
        tags: getProperty<string[]>(properties.Tags) || [],
        publishedDate: getProperty<string>(properties.PublishedDate),
      };
    });
  } catch (error: any) {
    console.error('Error fetching blog posts from Notion:', error);
    throw new Error(`Failed to fetch blog posts from Notion. Original error: ${error.message}`);
  }
};

export const getBlogPost = async (pageId: string) => {
  try {
    const page = await notion.pages.retrieve({ page_id: pageId });
    const mdblocks = await n2m.pageToMarkdown(pageId);
    const mdString = n2m.toMarkdownString(mdblocks);

    const { properties } = page as PageObjectResponse;
    const title = getProperty<string>(properties.Title);

    return {
      title: title,
      content: mdString.parent,
    };
  } catch (error: any) {
    console.error(`Error fetching blog post with ID ${pageId} from Notion:`, error);
    throw new Error(`Failed to fetch blog post from Notion. Original error: ${error.message}`);
  }
};

export const getAboutInfo = async () => {
  const databaseId = process.env.NOTION_ABOUT_DB_ID;

  if (!databaseId) {
    throw new Error('NOTION_ABOUT_DB_ID is not defined');
  }

  try {
    const response: QueryDatabaseResponse = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'Order',
          direction: 'ascending',
        },
      ],
    });

    return response.results.map((page) => {
      const { properties } = page as PageObjectResponse;
      return {
        id: page.id,
        section: getProperty<string>(properties.Section),
        content: getProperty<string>(properties.Content),
      };
    });
  } catch (error: any) {
    console.error('Error fetching about info from Notion:', error);
    throw new Error(`Failed to fetch about info from Notion. Original error: ${error.message}`);
  }
};

// TODO: Add functions to fetch data from Notion databases 