'use client';

import Giscus from '@giscus/react';

const GiscusComments = () => {
  return (
    <Giscus
      id="comments"
      repo="YOUR_GITHUB_USERNAME/YOUR_REPO_NAME" // Replace with your repo
      repoId="YOUR_REPO_ID" // Replace with your repo ID
      category="Announcements" // Can be a category of your choice
      categoryId="YOUR_CATEGORY_ID" // Replace with your category ID
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="dark" // Or 'light' or other themes
      lang="en"
      loading="lazy"
    />
  );
};

export default GiscusComments; 