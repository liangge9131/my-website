import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

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

  console.log('DEBUG: Attempting to query Projects database with ID:', databaseId);

  const response = await notion.databases.query({
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

  return response.results.map((page: any) => {
    return {
      id: page.id,
      name: page.properties.Name.title[0]?.plain_text,
      description: page.properties.Description.rich_text[0]?.plain_text,
      techStack: page.properties.TechStack.multi_select.map((item: any) => item.name),
      role: page.properties.Role.rich_text[0]?.plain_text,
      url: page.properties.URL.url,
      category: page.properties.Category.select?.name,
    };
  });
};

export const getBlogPosts = async () => {
  const databaseId = process.env.NOTION_BLOG_DB_ID;

  if (!databaseId) {
    throw new Error('NOTION_BLOG_DB_ID is not defined');
  }

  const response = await notion.databases.query({
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

  return response.results.map((page: any) => {
    return {
      id: page.id,
      title: page.properties.Title.title[0]?.plain_text,
      summary: page.properties.Summary.rich_text[0]?.plain_text,
      category: page.properties.Category.select?.name,
      tags: page.properties.Tags.multi_select.map((item: any) => item.name),
      publishedDate: page.properties.PublishedDate.date?.start,
    };
  });
};

export const getBlogPost = async (pageId: string) => {
  const page = await notion.pages.retrieve({ page_id: pageId });
  const mdblocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdblocks);

  return {
    // @ts-ignore
    title: page.properties.Title.title[0]?.plain_text,
    content: mdString.parent,
  };
};

export const getAboutInfo = async () => {
  const databaseId = process.env.NOTION_ABOUT_DB_ID;

  if (!databaseId) {
    throw new Error('NOTION_ABOUT_DB_ID is not defined');
  }

  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: 'Order',
        direction: 'ascending',
      },
    ],
  });

  return response.results.map((page: any) => {
    return {
      id: page.id,
      section: page.properties.Section.title[0]?.plain_text,
      content: page.properties.Content.rich_text[0]?.plain_text,
    };
  });
};

// TODO: Add functions to fetch data from Notion databases 